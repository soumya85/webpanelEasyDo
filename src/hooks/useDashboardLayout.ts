import { useState, useEffect } from "react";
import { CardSize } from "@/types/cardSize";

export interface DashboardCard {
  id: string;
  type:
    | "task"
    | "meetings"
    | "approvals"
    | "notes"
    | "chat"
    | "workStatus"
    | "notice"
    | "attendance"
    | "salary"
    | "performance";
  title: string;
  section: "quick-overview" | "productivity" | "information-hub";
  order: number;
  size?: CardSize;
  data?: any;
}

export interface DashboardSection {
  id: string;
  title: string;
  cards: DashboardCard[];
}

const STORAGE_KEY = "dashboard-layout";

const getDefaultLayout = (): DashboardCard[] => [
  {
    id: "tasks",
    type: "task",
    title: "Task at a Glance",
    section: "quick-overview",
    order: 0,
  },
  {
    id: "meetings",
    type: "meetings",
    title: "Meetings This Week",
    section: "quick-overview",
    order: 1,
  },
  {
    id: "approvals",
    type: "approvals",
    title: "Pending Approvals",
    section: "quick-overview",
    order: 2,
  },
  {
    id: "notes",
    type: "notes",
    title: "Quick Notes",
    section: "quick-overview",
    order: 3,
  },
  {
    id: "chat",
    type: "chat",
    title: "Recent Chat Activity",
    section: "productivity",
    order: 0,
  },
  {
    id: "workStatus",
    type: "workStatus",
    title: "My Daily Work Status",
    section: "productivity",
    order: 1,
  },
  {
    id: "notice",
    type: "notice",
    title: "Notice Board",
    section: "information-hub",
    order: 0,
  },
  {
    id: "attendance",
    type: "attendance",
    title: "Monthly Attendance Summary",
    section: "information-hub",
    order: 1,
  },
  {
    id: "salary",
    type: "salary",
    title: "Salary Snapshot",
    section: "information-hub",
    order: 2,
  },
  {
    id: "performance",
    type: "performance",
    title: "My Performance",
    section: "information-hub",
    order: 3,
  },
];

export const useDashboardLayout = () => {
  const [cards, setCards] = useState<DashboardCard[]>(getDefaultLayout());
  const [isLoading, setIsLoading] = useState(true);

  // Load layout from localStorage on mount
  useEffect(() => {
    try {
      const savedLayout = localStorage.getItem(STORAGE_KEY);
      if (savedLayout) {
        const parsed = JSON.parse(savedLayout);
        setCards(parsed);
      }
    } catch (error) {
      console.warn("Failed to load dashboard layout from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save layout to localStorage whenever cards change
  const saveLayout = (newCards: DashboardCard[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCards));
      setCards(newCards);
    } catch (error) {
      console.warn("Failed to save dashboard layout to localStorage:", error);
    }
  };

  // Get cards by section
  const getCardsBySection = (sectionId: string): DashboardCard[] => {
    return cards
      .filter((card) => card.section === sectionId)
      .sort((a, b) => a.order - b.order);
  };

  // Move card to different section
  const moveCard = (
    cardId: string,
    destinationSection: string,
    destinationIndex: number,
  ) => {
    const updatedCards = cards.map((card) => {
      if (card.id === cardId) {
        return {
          ...card,
          section: destinationSection as DashboardCard["section"],
          order: destinationIndex,
        };
      }
      return card;
    });

    // Reorder cards in the destination section
    const sectionCards = updatedCards.filter(
      (card) => card.section === destinationSection,
    );
    const otherCards = updatedCards.filter(
      (card) => card.section !== destinationSection,
    );

    const reorderedSectionCards = sectionCards.map((card, index) => ({
      ...card,
      order: index,
    }));

    // Reorder cards in other sections to maintain consistent ordering
    const reorderedCards = [
      ...otherCards.map((card) => {
        const sectionCards = otherCards.filter(
          (c) => c.section === card.section,
        );
        const cardIndex = sectionCards.findIndex((c) => c.id === card.id);
        return { ...card, order: cardIndex };
      }),
      ...reorderedSectionCards,
    ];

    saveLayout(reorderedCards);
  };

  // Reorder cards within the same section
  const reorderCards = (
    sectionId: string,
    startIndex: number,
    endIndex: number,
  ) => {
    const sectionCards = getCardsBySection(sectionId);
    const otherCards = cards.filter((card) => card.section !== sectionId);

    // Reorder within section
    const reorderedSectionCards = [...sectionCards];
    const [removed] = reorderedSectionCards.splice(startIndex, 1);
    reorderedSectionCards.splice(endIndex, 0, removed);

    // Update order indices
    const updatedSectionCards = reorderedSectionCards.map((card, index) => ({
      ...card,
      order: index,
    }));

    const updatedCards = [...otherCards, ...updatedSectionCards];
    saveLayout(updatedCards);
  };

  // Reset to default layout
  const resetLayout = () => {
    saveLayout(getDefaultLayout());
  };

  // Get sections with their cards
  const getSections = (): DashboardSection[] => [
    {
      id: "quick-overview",
      title: "Quick Overview",
      cards: getCardsBySection("quick-overview"),
    },
    {
      id: "productivity",
      title: "Personal Productivity & Communication",
      cards: getCardsBySection("productivity"),
    },
    {
      id: "information-hub",
      title: "Information Hub",
      cards: getCardsBySection("information-hub"),
    },
  ];

  return {
    cards,
    sections: getSections(),
    getCardsBySection,
    moveCard,
    reorderCards,
    resetLayout,
    isLoading,
  };
};

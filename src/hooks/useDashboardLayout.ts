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
    title: "taskAtGlance",
    section: "quick-overview",
    order: 0,
    size: "medium",
  },
  {
    id: "meetings",
    type: "meetings",
    title: "meetingsThisWeek",
    section: "quick-overview",
    order: 1,
    size: "medium",
  },
  {
    id: "approvals",
    type: "approvals",
    title: "pendingApprovals",
    section: "quick-overview",
    order: 2,
    size: "medium",
  },
  {
    id: "notes",
    type: "notes",
    title: "personalNotes",
    section: "quick-overview",
    order: 3,
    size: "medium",
  },
  {
    id: "chat",
    type: "chat",
    title: "teamChat",
    section: "productivity",
    order: 0,
    size: "large",
  },
  {
    id: "workStatus",
    type: "workStatus",
    title: "workStatus",
    section: "productivity",
    order: 1,
    size: "large",
  },
  {
    id: "notice",
    type: "notice",
    title: "companyNotice",
    section: "information-hub",
    order: 0,
    size: "medium",
  },
  {
    id: "attendance",
    type: "attendance",
    title: "monthlyAttendance",
    section: "information-hub",
    order: 1,
    size: "medium",
  },
  {
    id: "salary",
    type: "salary",
    title: "salaryOverview",
    section: "information-hub",
    order: 2,
    size: "medium",
  },
  {
    id: "performance",
    type: "performance",
    title: "performanceMetrics",
    section: "information-hub",
    order: 3,
    size: "medium",
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

  // Move card to different section or position
  const moveCard = (
    cardId: string,
    destinationSection: string,
    destinationIndex: number,
  ) => {
    const sourceCard = cards.find((card) => card.id === cardId);
    if (!sourceCard) return;

    // Get cards in destination section (excluding the card being moved)
    const destinationCards = cards
      .filter(
        (card) => card.section === destinationSection && card.id !== cardId,
      )
      .sort((a, b) => a.order - b.order);

    // Create the moved card with new section
    const movedCard = {
      ...sourceCard,
      section: destinationSection as DashboardCard["section"],
      size: sourceCard.size || "medium",
    };

    // Insert the moved card at the specified index
    destinationCards.splice(destinationIndex, 0, movedCard);

    // Update order indices for destination section
    const updatedDestinationCards = destinationCards.map((card, index) => ({
      ...card,
      order: index,
    }));

    // Get cards from other sections and reorder them
    const otherSectionCards = cards
      .filter(
        (card) => card.section !== destinationSection && card.id !== cardId,
      )
      .map((card) => {
        const sectionCards = cards.filter(
          (c) => c.section === card.section && c.id !== cardId,
        );
        const cardIndex = sectionCards
          .sort((a, b) => a.order - b.order)
          .findIndex((c) => c.id === card.id);
        return { ...card, order: cardIndex };
      });

    const allUpdatedCards = [...otherSectionCards, ...updatedDestinationCards];
    saveLayout(allUpdatedCards);
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

  // Resize card
  const resizeCard = (cardId: string, newSize: CardSize) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, size: newSize } : card,
    );
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
    resizeCard,
    resetLayout,
    isLoading,
  };
};

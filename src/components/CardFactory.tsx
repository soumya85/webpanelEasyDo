import React from "react";
import { DashboardCard } from "../hooks/useDashboardLayout";
import { CardSize } from "@/types/cardSize";
import { TaskCard } from "./cards/TaskCard";
import { MeetingsCard } from "./cards/MeetingsCard";
import { ApprovalsCard } from "./cards/ApprovalsCard";
import { NotesCard } from "./cards/NotesCard";
import { ChatCard } from "./cards/ChatCard";
import { WorkStatusCard } from "./cards/WorkStatusCard";
import { NoticeCard } from "./cards/NoticeCard";
import { AttendanceCard } from "./cards/AttendanceCard";
import { SalaryCard } from "./cards/SalaryCard";
import { PerformanceCard } from "./cards/PerformanceCard";

interface CardFactoryProps {
  card: DashboardCard;
  index: number;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const CardFactory: React.FC<CardFactoryProps> = ({ card, index }) => {
  switch (card.type) {
    case "task":
      return <TaskCard id={card.id} index={index} />;
    case "meetings":
      return <MeetingsCard id={card.id} index={index} />;
    case "approvals":
      return <ApprovalsCard id={card.id} index={index} />;
    case "notes":
      return <NotesCard id={card.id} index={index} />;
    case "chat":
      return <ChatCard id={card.id} index={index} />;
    case "workStatus":
      return <WorkStatusCard id={card.id} index={index} />;
    case "notice":
      return <NoticeCard id={card.id} index={index} />;
    case "attendance":
      return <AttendanceCard id={card.id} index={index} />;
    case "salary":
      return <SalaryCard id={card.id} index={index} />;
    case "performance":
      return <PerformanceCard id={card.id} index={index} />;
    default:
      return null;
  }
};

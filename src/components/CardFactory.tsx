import React from "react";
import { DashboardCard } from "../hooks/useDashboardLayout";
import { CardSize } from "@/types/cardSize";
import { TaskCard } from "./cards/TaskCard";
import { MyTaskCard } from "./cards/MyTaskCard";
import { DelegatedTaskCard } from "./cards/DelegatedTaskCard";
import { MeetingsCard } from "./cards/MeetingsCard";
import { ApprovalsCard } from "./cards/ApprovalsCard";
import { NotesCard } from "./cards/NotesCard";
import { ChatCard } from "./cards/ChatCard";
import { WorkStatusCard } from "./cards/WorkStatusCard";
import { NoticeCard } from "./cards/NoticeCard";
import { AttendanceCard } from "./cards/AttendanceCard";
import { SalaryCard } from "./cards/SalaryCard";
import { PerformanceCard } from "./cards/PerformanceCard";
import { TodayScheduleCard } from "./cards/TodayScheduleCard";

interface CardFactoryProps {
  card: DashboardCard;
  index: number;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const CardFactory: React.FC<CardFactoryProps> = ({
  card,
  index,
  onResize,
}) => {
  const commonProps = {
    id: card.id,
    index,
    size: card.size,
    onResize,
  };

  switch (card.type) {
    case "task":
      return <TaskCard {...commonProps} />;
    case "myTask":
      return <MyTaskCard {...commonProps} />;
    case "delegatedTask":
      return <DelegatedTaskCard {...commonProps} />;
    case "meetings":
      return <MeetingsCard {...commonProps} />;
    case "approvals":
      return <ApprovalsCard {...commonProps} />;
    case "notes":
      return <NotesCard {...commonProps} />;
    case "chat":
      return <ChatCard {...commonProps} />;
    case "workStatus":
      return <WorkStatusCard {...commonProps} />;
    case "notice":
      return <NoticeCard {...commonProps} />;
    case "attendance":
      return <AttendanceCard {...commonProps} />;
    case "salary":
      return <SalaryCard {...commonProps} />;
    case "performance":
      return <PerformanceCard {...commonProps} />;
    case "todaySchedule":
      return <TodayScheduleCard {...commonProps} />;

    default:
      return null;
  }
};

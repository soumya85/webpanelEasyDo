import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  UserCheck,
  DollarSign,
  Clock,
  FileText,
  FileCheck,
  UserPlus,
  Settings,
  CreditCard,
  Plane,
  HandCoins,
} from "lucide-react";

interface ApprovalsModalProps {
  open: boolean;
  onClose: () => void;
  onBackToReports: () => void;
}

interface ApprovalCard {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  onClick?: () => void;
}

const adminApprovals: ApprovalCard[] = [
  {
    id: "leave",
    title: "Leave Request",
    icon: UserCheck,
    count: 1,
  },
  {
    id: "salary",
    title: "Salary Adv. Request",
    icon: DollarSign,
  },
  {
    id: "overtime",
    title: "Overtime Request",
    icon: Clock,
  },
  {
    id: "quotation",
    title: "Quotation Approval",
    icon: FileText,
  },
  {
    id: "contract",
    title: "Contract Approval",
    icon: FileCheck,
  },
  {
    id: "punchin",
    title: "Punch-in Approval",
    icon: UserPlus,
    count: 1,
  },
];

const employeeExpenseApprovals: ApprovalCard[] = [
  {
    id: "operational",
    title: "Operational",
    icon: Settings,
  },
  {
    id: "general",
    title: "General",
    icon: CreditCard,
  },
  {
    id: "travel",
    title: "Travel",
    icon: Plane,
  },
];

const vendorPayments: ApprovalCard[] = [
  {
    id: "payment",
    title: "Payment Request",
    icon: HandCoins,
  },
];

const ApprovalCardComponent: React.FC<{ card: ApprovalCard }> = ({ card }) => {
  const IconComponent = card.icon;

  return (
    <button
      onClick={card.onClick}
      className="relative flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 h-24 group"
    >
      {card.count && card.count > 0 && (
        <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center p-0">
          {card.count}
        </Badge>
      )}
      <IconComponent className="w-8 h-8 text-blue-500 mb-2 group-hover:text-blue-600 transition-colors" />
      <span className="text-xs font-medium text-gray-800 text-center leading-tight">
        {card.title}
      </span>
    </button>
  );
};

export const ApprovalsModal: React.FC<ApprovalsModalProps> = ({
  open,
  onClose,
  onBackToReports,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[95vh] overflow-y-auto p-0 [&>button]:hidden">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Approvals</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <button onClick={onBackToReports} className="p-1">
            <ArrowLeft className="w-5 h-5 text-blue-500" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
            Approvals
          </h1>
          <div className="w-6"></div>
        </div>

        <div className="p-6 space-y-8">
          {/* Admin Approval Section */}
          <div className="space-y-4">
            <div className="bg-blue-100 rounded-xl px-4 py-2 inline-block">
              <h2 className="text-sm font-semibold text-gray-800">
                Admin Approval
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {adminApprovals.map((card) => (
                <ApprovalCardComponent key={card.id} card={card} />
              ))}
            </div>
          </div>

          {/* Employee Expense Approval Section */}
          <div className="space-y-4">
            <div className="bg-blue-100 rounded-xl px-4 py-2 inline-block">
              <h2 className="text-sm font-semibold text-gray-800">
                Employee Expense Approval
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {employeeExpenseApprovals.map((card) => (
                <ApprovalCardComponent key={card.id} card={card} />
              ))}
            </div>
          </div>

          {/* Vendor Payment Section */}
          <div className="space-y-4">
            <div className="bg-blue-100 rounded-xl px-4 py-2 inline-block">
              <h2 className="text-sm font-semibold text-gray-800">
                Vendor Payment
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {vendorPayments.map((card) => (
                <ApprovalCardComponent key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

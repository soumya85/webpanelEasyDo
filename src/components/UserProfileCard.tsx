import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface AdminProfileCardProps {
  name?: string;
  title?: string;
  initials?: string;
  authorityLevel?: string | number;
  showVerification?: boolean;
  className?: string;
}

export function AdminProfileCard({
  name = "Bhaskar Ghosh",
  title = "Executive Director", 
  initials = "BG",
  authorityLevel = "1",
  showVerification = true,
  className = ""
}: AdminProfileCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center gap-4 p-4">
        {/* Avatar */}
        <Avatar className="h-20 w-20">
          <AvatarFallback className="bg-azure-24 text-white text-xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="flex flex-col items-center gap-2 text-center">
          {/* Name with verification */}
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-azure-24">{name}</h3>
            {showVerification && (
              <svg
                width="12"
                height="15"
                viewBox="0 0 13 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 0.65625L0.5 3.34375V7.34375C0.5 11.0312 3.0625 14.5 6.5 15.3438C9.9375 14.5 12.5 11.0312 12.5 7.34375V3.34375L6.5 0.65625ZM11.1562 7.34375C11.1562 10.3438 9.1875 13.125 6.5 13.9688C3.8125 13.125 1.84375 10.3438 1.84375 7.34375V4.1875L6.5 2.125L11.1562 4.1875V7.34375ZM3.4375 7.71875L2.5 8.65625L5.15625 11.3438L10.5 6L9.5625 5.0625L5.15625 9.4375L3.4375 7.71875Z"
                  fill="#17C666"
                />
              </svg>
            )}
          </div>

          {/* Title */}
          <span className="text-xs text-azure-24">{title}</span>

          {/* Authority Level Badge */}
          <Badge className="bg-primary text-white">
            Authority Level {authorityLevel}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminProfileCard;

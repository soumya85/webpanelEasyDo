import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserProfileProps {
  isExpanded: boolean;
}

export function UserProfile({ isExpanded }: UserProfileProps) {
  if (!isExpanded) {
    return (
      <div className="flex flex-col items-center p-4">
        <Avatar className="h-12 w-12 border-4 border-gray-200">
          <AvatarImage src="/api/placeholder/90/90" alt="Bhaskar Ghosh" />
          <AvatarFallback className="bg-azure-24 text-white font-semibold">
            BG
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 border-b border-gray-300">
      <Avatar className="h-20 w-20 border-4 border-gray-200">
        <AvatarImage src="/api/placeholder/90/90" alt="Bhaskar Ghosh" />
        <AvatarFallback className="bg-azure-24 text-white font-semibold text-xl">
          BG
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-azure-24 text-base leading-tight">
            Bhaskar Ghosh
          </h3>
          <Shield className="h-3 w-3 text-success fill-current" />
        </div>

        <p className="text-xs text-azure-24 leading-tight">
          Executive Director
        </p>

        <Badge
          variant="default"
          className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-xl"
        >
          Authority Level 1
        </Badge>
      </div>
    </div>
  );
}

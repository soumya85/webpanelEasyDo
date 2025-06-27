import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser, getUserInitials, getProfileImageSrc } from "@/hooks/useUser";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";

interface UserProfileProps {
  isExpanded: boolean;
}

export function UserProfile({ isExpanded }: UserProfileProps) {
  const { user } = useUser();
  const { t } = useTranslation();

  if (!isExpanded) {
    return (
      <div className="flex flex-col items-center p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={getProfileImageSrc(user)} alt={user.name} />
          <AvatarFallback className="bg-azure-24 text-white font-semibold">
            {getUserInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 border-b border-gray-300">
      <Avatar className="h-20 w-20">
        <AvatarImage src={getProfileImageSrc(user)} alt={user.name} />
        <AvatarFallback className="bg-azure-24 text-white font-semibold text-xl">
          {getUserInitials(user.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-azure-24 text-base leading-tight">
            {user.name}
          </h3>
          <svg
            width="12"
            height="15"
            viewBox="0 0 13 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <path
              d="M6.5 0.65625L0.5 3.34375V7.34375C0.5 11.0312 3.0625 14.5 6.5 15.3438C9.9375 14.5 12.5 11.0312 12.5 7.34375V3.34375L6.5 0.65625ZM11.1562 7.34375C11.1562 10.3438 9.1875 13.125 6.5 13.9688C3.8125 13.125 1.84375 10.3438 1.84375 7.34375V4.1875L6.5 2.125L11.1562 4.1875V7.34375ZM3.4375 7.71875L2.5 8.65625L5.15625 11.3438L10.5 6L9.5625 5.0625L5.15625 9.4375L3.4375 7.71875Z"
              fill="#17C666"
            />
          </svg>
        </div>

        <p className="text-xs text-azure-24 leading-tight">{user.position}</p>

        <Badge
          variant="default"
          className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-xl"
        >
          <MultilingualText>
            {t("authorityLevel")} {user.authorityLevel}
          </MultilingualText>
        </Badge>
      </div>
    </div>
  );
}

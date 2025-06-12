import React from "react";
import { cn } from "@/lib/utils";

// KPI Card Component
interface KPICardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const KPICard: React.FC<KPICardProps> = ({ icon, value, label }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-7 bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
        "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
        "px-4 py-0 h-[154px] flex-1 min-w-[257px]",
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex flex-col justify-center items-start">
        <div className="text-[#283C50] text-[40px] font-bold leading-[64px] font-inter">
          {value}
        </div>
        <div className="text-[#283C50] text-[15px] font-bold leading-[19.2px] font-inter">
          {label}
        </div>
      </div>
    </div>
  );
};

// Icon Components
const TotalEmployeesIcon = () => (
  <div
    className={cn(
      "flex justify-center items-center w-[50px] h-[50px]",
      "border border-[#DCDEE4] rounded-full bg-[#F6F7FA]",
    )}
  >
    <svg
      width="50"
      height="51"
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_66_134" fill="white">
        <path d="M0 25.19C0 11.3829 11.1929 0.190002 25 0.190002C38.8071 0.190002 50 11.3829 50 25.19C50 38.9971 38.8071 50.19 25 50.19C11.1929 50.19 0 38.9971 0 25.19Z" />
      </mask>
      <path
        d="M0 25.19C0 11.3829 11.1929 0.190002 25 0.190002C38.8071 0.190002 50 11.3829 50 25.19C50 38.9971 38.8071 50.19 25 50.19C11.1929 50.19 0 38.9971 0 25.19Z"
        fill="#F6F7FA"
      />
      <path
        d="M25 50.19V49.19C11.7452 49.19 1 38.4448 1 25.19H0H-1C-1 39.5494 10.6406 51.19 25 51.19V50.19ZM50 25.19H49C49 38.4448 38.2548 49.19 25 49.19V50.19V51.19C39.3594 51.19 51 39.5494 51 25.19H50ZM25 0.190002V1.19C38.2548 1.19 49 11.9352 49 25.19H50H51C51 10.8306 39.3594 -0.809998 25 -0.809998V0.190002ZM25 0.190002V-0.809998C10.6406 -0.809998 -1 10.8306 -1 25.19H0H1C1 11.9352 11.7452 1.19 25 1.19V0.190002Z"
        fill="#DCDEE4"
        mask="url(#path-1-inside-1_66_134)"
      />
      <path
        d="M17.5 29.1744H20.5V35.1744H17.5V29.1744ZM32.5 15.5806C32.4375 17.0494 32.0625 18.3306 31.375 19.4244C30.6875 20.4869 29.7344 21.2056 28.5156 21.5806V35.1744H26.5V29.1744H24.5312V35.1744H22.5156V23.2681C22.2344 23.3619 22.0312 23.4713 21.9062 23.5963C20.9688 24.3463 20.5 25.3775 20.5 26.69V27.2056H18.5312V26.69C18.5312 24.7213 19.2344 23.1275 20.6406 21.9088C22.0469 20.7525 23.6719 20.1744 25.5156 20.1744C26.9219 20.1744 28.0781 19.8306 28.9844 19.1431C30.0156 18.2994 30.5312 17.1431 30.5312 15.6744V15.2056H32.5V15.5806ZM26.9219 18.5806C26.5156 18.9869 26.0469 19.19 25.5156 19.19C24.9844 19.19 24.5156 18.9869 24.1094 18.5806C23.7031 18.1744 23.5 17.7056 23.5 17.1744C23.5 16.6431 23.7031 16.19 24.1094 15.815C24.5156 15.4088 24.9844 15.2056 25.5156 15.2056C26.0469 15.2056 26.5156 15.4088 26.9219 15.815C27.3281 16.19 27.5312 16.6431 27.5312 17.1744C27.5312 17.7056 27.3281 18.1744 26.9219 18.5806Z"
        fill="#4766E5"
      />
    </svg>
  </div>
);

const EmployeesOnLeaveIcon = () => (
  <div
    className={cn(
      "flex justify-center items-center w-[50px] h-[50px]",
      "border border-[#DCDEE4] rounded-full bg-[#F6F7FA]",
    )}
  >
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_66_140" fill="white">
        <path d="M0.333008 25.19C0.333008 11.3829 11.5259 0.190002 25.333 0.190002C39.1401 0.190002 50.333 11.3829 50.333 25.19C50.333 38.9971 39.1401 50.19 25.333 50.19C11.5259 50.19 0.333008 38.9971 0.333008 25.19Z" />
      </mask>
      <path
        d="M0.333008 25.19C0.333008 11.3829 11.5259 0.190002 25.333 0.190002C39.1401 0.190002 50.333 11.3829 50.333 25.19C50.333 38.9971 39.1401 50.19 25.333 50.19C11.5259 50.19 0.333008 38.9971 0.333008 25.19Z"
        fill="#F6F7FA"
      />
      <path
        d="M25.333 50.19V49.19C12.0782 49.19 1.33301 38.4448 1.33301 25.19H0.333008H-0.666992C-0.666992 39.5494 10.9736 51.19 25.333 51.19V50.19ZM50.333 25.19H49.333C49.333 38.4448 38.5878 49.19 25.333 49.19V50.19V51.19C39.6924 51.19 51.333 39.5494 51.333 25.19H50.333ZM25.333 0.190002V1.19C38.5878 1.19 49.333 11.9352 49.333 25.19H50.333H51.333C51.333 10.8306 39.6924 -0.809998 25.333 -0.809998V0.190002ZM25.333 0.190002V-0.809998C10.9736 -0.809998 -0.666992 10.8306 -0.666992 25.19H0.333008H1.33301C1.33301 11.9352 12.0782 1.19 25.333 1.19V0.190002Z"
        fill="#DCDEE4"
        mask="url(#path-1-inside-1_66_140)"
      />
      <path
        d="M34.333 32.7369L32.9268 34.19L26.458 27.7681L27.9111 26.315L34.333 32.7369ZM26.458 16.19C23.8799 16.19 21.3018 17.1744 19.333 19.1431H19.2861C15.3486 23.0806 15.3486 29.5025 19.2861 33.44L33.583 19.1431C31.6143 17.1744 29.0361 16.19 26.458 16.19ZM19.4736 30.44C18.7236 29.2213 18.3486 27.815 18.3486 26.315C18.3486 25.3775 18.4893 24.4869 18.7705 23.6431C19.0049 25.565 19.6611 27.44 20.8799 29.0806L19.4736 30.44ZM22.333 27.6275C20.9736 25.565 20.458 23.1275 20.9268 20.7838C21.5361 20.69 22.0986 20.5963 22.6611 20.5963C24.4893 20.5963 26.2236 21.1588 27.7705 22.19L22.333 27.6275ZM23.7861 18.6275C24.6299 18.3463 25.5205 18.2056 26.458 18.2056C27.958 18.2056 29.3643 18.5806 30.583 19.3306L29.2236 20.7369C27.583 19.5181 25.708 18.8619 23.7861 18.6275Z"
        fill="#4766E5"
      />
    </svg>
  </div>
);

const NewJoineesIcon = () => (
  <div
    className={cn(
      "flex justify-center items-center w-[50px] h-[50px]",
      "border border-[#DCDEE4] rounded-full bg-[#F6F7FA]",
    )}
  >
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_66_146" fill="white">
        <path d="M0.666992 25.19C0.666992 11.3829 11.8599 0.190002 25.667 0.190002C39.4741 0.190002 50.667 11.3829 50.667 25.19C50.667 38.9971 39.4741 50.19 25.667 50.19C11.8599 50.19 0.666992 38.9971 0.666992 25.19Z" />
      </mask>
      <path
        d="M0.666992 25.19C0.666992 11.3829 11.8599 0.190002 25.667 0.190002C39.4741 0.190002 50.667 11.3829 50.667 25.19C50.667 38.9971 39.4741 50.19 25.667 50.19C11.8599 50.19 0.666992 38.9971 0.666992 25.19Z"
        fill="#F6F7FA"
      />
      <path
        d="M25.667 50.19V49.19C12.4122 49.19 1.66699 38.4448 1.66699 25.19H0.666992H-0.333008C-0.333008 39.5494 11.3076 51.19 25.667 51.19V50.19ZM50.667 25.19H49.667C49.667 38.4448 38.9218 49.19 25.667 49.19V50.19V51.19C40.0264 51.19 51.667 39.5494 51.667 25.19H50.667ZM25.667 0.190002V1.19C38.9218 1.19 49.667 11.9352 49.667 25.19H50.667H51.667C51.667 10.8306 40.0264 -0.809998 25.667 -0.809998V0.190002ZM25.667 0.190002V-0.809998C11.3076 -0.809998 -0.333008 10.8306 -0.333008 25.19H0.666992H1.66699C1.66699 11.9352 12.4122 1.19 25.667 1.19V0.190002Z"
        fill="#DCDEE4"
        mask="url(#path-1-inside-1_66_146)"
      />
      <path
        d="M29.3936 21.2994L33.8467 25.7994L32.4404 27.2056L28.5029 23.2213V35.1744H26.4873V29.1744H24.5186V35.1744H22.5029V21.9088C21.0342 21.4713 19.8311 20.6431 18.8936 19.4244C17.9561 18.1744 17.4873 16.7681 17.4873 15.2056H19.5029C19.5029 16.5806 19.9873 17.7525 20.9561 18.7213C21.9248 19.69 23.0967 20.1744 24.4717 20.1744H27.0498C27.8623 20.1744 28.6436 20.5494 29.3936 21.2994ZM24.0498 18.6275C23.6748 18.2213 23.4873 17.7369 23.4873 17.1744C23.4873 16.6119 23.6748 16.1431 24.0498 15.7681C24.4561 15.3931 24.9404 15.2056 25.5029 15.2056C26.0654 15.2056 26.5342 15.3931 26.9092 15.7681C27.3154 16.1431 27.5186 16.6119 27.5186 17.1744C27.5186 17.7369 27.3154 18.2213 26.9092 18.6275C26.5342 19.0025 26.0654 19.19 25.5029 19.19C24.9404 19.19 24.4561 19.0025 24.0498 18.6275Z"
        fill="#4766E5"
      />
    </svg>
  </div>
);

const TotalHolidayIcon = () => (
  <div
    className={cn(
      "flex justify-center items-center w-[50px] h-[50px]",
      "border border-[#DCDEE4] rounded-full bg-[#F6F7FA]",
    )}
  >
    <svg
      width="50"
      height="51"
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_66_152" fill="white">
        <path d="M0 25.19C0 11.3829 11.1929 0.190002 25 0.190002C38.8071 0.190002 50 11.3829 50 25.19C50 38.9971 38.8071 50.19 25 50.19C11.1929 50.19 0 38.9971 0 25.19Z" />
      </mask>
      <path
        d="M0 25.19C0 11.3829 11.1929 0.190002 25 0.190002C38.8071 0.190002 50 11.3829 50 25.19C50 38.9971 38.8071 50.19 25 50.19C11.1929 50.19 0 38.9971 0 25.19Z"
        fill="#F6F7FA"
      />
      <path
        d="M25 50.19V49.19C11.7452 49.19 1 38.4448 1 25.19H0H-1C-1 39.5494 10.6406 51.19 25 51.19V50.19ZM50 25.19H49C49 38.4448 38.2548 49.19 25 49.19V50.19V51.19C39.3594 51.19 51 39.5494 51 25.19H50ZM25 0.190002V1.19C38.2548 1.19 49 11.9352 49 25.19H50H51C51 10.8306 39.3594 -0.809998 25 -0.809998V0.190002ZM25 0.190002V-0.809998C10.6406 -0.809998 -1 10.8306 -1 25.19H0H1C1 11.9352 11.7452 1.19 25 1.19V0.190002Z"
        fill="#DCDEE4"
        mask="url(#path-1-inside-1_66_152)"
      />
      <path
        d="M31.9844 17.1744C32.5469 17.1744 33.0156 17.3775 33.3906 17.7838C33.7969 18.1588 34 18.6275 34 19.19V33.2056C34 33.7369 33.7969 34.2056 33.3906 34.6119C33.0156 34.9869 32.5469 35.1744 31.9844 35.1744H18.0156C17.4531 35.1744 16.9688 34.9869 16.5625 34.6119C16.1875 34.2056 16 33.7369 16 33.2056V19.19C16 18.6275 16.1875 18.1588 16.5625 17.7838C16.9688 17.3775 17.4531 17.1744 18.0156 17.1744H19V15.2056H21.0156V17.1744H28.9844V15.2056H31V17.1744H31.9844ZM31.9844 33.2056V23.1744H18.0156V33.2056H31.9844ZM22 27.2056V25.19H19.9844V27.2056H22ZM25.9844 27.2056V25.19H24.0156V27.2056H25.9844ZM30.0156 27.2056V25.19H28V27.2056H30.0156ZM22 31.19V29.1744H19.9844V31.19H22ZM25.9844 31.19V29.1744H24.0156V31.19H25.9844ZM30.0156 31.19V29.1744H28V31.19H30.0156Z"
        fill="#4766E5"
      />
    </svg>
  </div>
);

const ChevronRightIcon = () => (
  <svg
    width="6"
    height="9"
    viewBox="0 0 6 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-1 h-[7px]"
  >
    <path
      d="M1.00391 7.595L5.00391 4.095L1.00391 0.595001"
      stroke="#7C8796"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Overview: React.FC = () => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between items-start self-stretch relative w-full min-h-screen",
        "bg-[#F8F9FA] font-inter",
      )}
    >
      {/* Page Area */}
      <div
        className={cn(
          "flex w-full pr-4 pt-6 pb-6 pl-4 flex-col items-start gap-6",
          "relative ml-[280px]",
        )}
      >
        {/* Breadcrumb Section Row */}
        <div
          className={cn(
            "flex min-h-[65px] px-[30px] py-[13.5px] justify-between items-center self-stretch",
            "rounded-lg border-l-[6px] border-[#4766E5] bg-white",
            "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
          )}
        >
          {/* Breadcrumb Navigation */}
          <div className="flex justify-center items-center gap-[10px]">
            <div className="text-[#283C50] font-inter text-base font-bold leading-[19.2px]">
              Overview
            </div>
            <div className="text-[#DBD9D9] font-inter text-base font-normal leading-[19.2px]">
              |
            </div>
            <div className="text-[#283C50] font-inter text-[13px] font-bold leading-[20.8px]">
              Liberty Highrise PVT Ltd
            </div>
            <ChevronRightIcon />
            <div className="text-[#222] font-inter text-[13px] font-normal leading-[20.8px]">
              All Branch
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex justify-center items-center gap-[10px]">
            <div
              className={cn(
                "text-[#283C50] font-inter text-xs font-normal leading-[19.2px] uppercase",
                "flex px-4 py-[10.5px] flex-col items-start rounded-[5px]",
                "border border-[#DCDEE4]",
              )}
            >
              APR 22, 25 - MAY 21, 25
            </div>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div
          className={cn(
            "flex justify-between items-center self-stretch gap-5",
            "flex-wrap lg:flex-nowrap",
          )}
        >
          <KPICard
            icon={<TotalEmployeesIcon />}
            value="120"
            label="Total Employees"
          />
          <KPICard
            icon={<EmployeesOnLeaveIcon />}
            value="12"
            label="Employees On Leave"
          />
          <KPICard icon={<NewJoineesIcon />} value="4" label="New Joinees" />
          <KPICard
            icon={<TotalHolidayIcon />}
            value="5"
            label="Total Holiday"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;

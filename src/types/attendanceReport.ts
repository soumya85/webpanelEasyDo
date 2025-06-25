export interface AttendanceScoreData {
  userScore: number;
  officeScore: number;
  isAboveAverage: boolean;
}

export interface EmployeeStatusData {
  present: number;
  absent: number;
  late: number;
  halfDays: number;
  onLeaves: number;
}

export interface LeaveBalanceData {
  earned: { used: number; total: number };
  sick: { used: number; total: number };
  casual: { used: number; total: number };
  others: { used: number; total: number };
}

export interface EmployeeInsightData {
  totalWorkingTime: string;
  averageWorkingTime: string;
  averageBreakTime: string;
}

export interface OfficeDaysData {
  totalDays: number;
  workingDays: number;
  holidays: number;
  weeklyOff: number;
}

export interface AttendanceLogEntry {
  day: string;
  punchIn: string;
  punchOut: string;
  isWeekend: boolean;
}

export interface SelectionData {
  branch: string;
  employee: string;
  totalStaffs: number;
}

export interface AttendanceReportData {
  period: string;
  dateRange: string;
  selection: SelectionData;
  attendanceScore: AttendanceScoreData;
  employeeStatus: EmployeeStatusData;
  leaveBalance: LeaveBalanceData;
  employeeInsights: EmployeeInsightData;
  officeDays: OfficeDaysData;
  attendanceLog: AttendanceLogEntry[];
}

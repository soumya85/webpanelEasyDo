import React, { useState } from "react";
import { CalendarDays, ChevronRight, CheckCircle, XCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// Dummy leave data
const initialLeaves = [
	{
		id: "1",
		name: "Amit Sharma",
		avatar: "AS",
		position: "Software Engineer",
		branch: "Head Office",
		from: "2025-06-24",
		to: "2025-06-26",
		status: "approved",
		reason: "Family function",
	},
	{
		id: "2",
		name: "Priya Verma",
		avatar: "PV",
		position: "HR Manager",
		branch: "New Delhi",
		from: "2025-06-25",
		to: "2025-06-25",
		status: "pending",
		reason: "Medical appointment",
	},
	{
		id: "3",
		name: "Rahul Das",
		avatar: "RD",
		position: "Accountant",
		branch: "Haldia",
		from: "2025-06-24",
		to: "2025-06-24",
		status: "denied",
		reason: "Personal work",
	},
	{
		id: "4",
		name: "Sneha Mukherjee",
		avatar: "SM",
		position: "Operations Lead",
		branch: "Paradip",
		from: "2025-06-26",
		to: "2025-06-27",
		status: "approved",
		reason: "Vacation",
	},
];

const statusMap = {
	approved: {
		label: "Approved",
		color: "bg-green-100 text-green-700",
		icon: <CheckCircle className="w-4 h-4 text-green-500" />,
	},
	pending: {
		label: "Pending",
		color: "bg-yellow-100 text-yellow-700",
		icon: <Clock className="w-4 h-4 text-yellow-500" />,
	},
	denied: {
		label: "Denied",
		color: "bg-red-100 text-red-700",
		icon: <XCircle className="w-4 h-4 text-red-500" />,
	},
};

function getDatesBetween(start: string, end: string) {
	const dates = [];
	let current = new Date(start);
	const last = new Date(end);
	while (current <= last) {
		dates.push(format(current, "yyyy-MM-dd"));
		current.setDate(current.getDate() + 1);
	}
	return dates;
}

const statusTabs = [
	{ key: "pending", label: "Pending" },
	{ key: "approved", label: "Approved" },
	{ key: "denied", label: "Denied" },
];

export default function Leave() {
	const [leaves] = useState(initialLeaves);
	const [search, setSearch] = useState("");
	const [view, setView] = useState<"list" | "day">("list");
	const [selectedDay, setSelectedDay] = useState<string | null>(null);
	const [statusTab, setStatusTab] = useState<"pending" | "approved" | "denied">("pending");
	const navigate = useNavigate();

	// Leaves for selected day and status
	const leavesOnDay = leaves.filter(l =>
		selectedDay &&
		getDatesBetween(l.from, l.to).includes(selectedDay) &&
		l.status === statusTab &&
		(
			l.name.toLowerCase().includes(search.toLowerCase()) ||
			l.position.toLowerCase().includes(search.toLowerCase()) ||
			l.branch.toLowerCase().includes(search.toLowerCase()) ||
			l.reason.toLowerCase().includes(search.toLowerCase())
		)
	);

	return (
		<div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter flex flex-col">
			{/* Header */}
			<div className="w-full sticky top-0 z-30 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 shadow">
				<div className="max-w-7xl mx-auto flex flex-col gap-1 px-4 py-4">
					<div className="flex items-center gap-3">
						<CalendarDays className="h-8 w-8 text-white bg-indigo-500 rounded-full p-1 shadow" />
						<div>
							<h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
								Employee Leaves
							</h1>
						</div>
					</div>
					{/* Breadcrumb */}
					<nav className="flex items-center gap-2 mt-1 text-xs">
						<span
							className="text-blue-100 font-semibold cursor-pointer hover:underline"
							onClick={() => navigate("/company-dashboard")}
						>
							Company Dashboard
						</span>
						<ChevronRight className="w-3 h-3 text-blue-100" />
						<span className="text-blue-100">Leave</span>
					</nav>
				</div>
			</div>

			{/* Actions */}
			<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
				<Input
					className="w-full md:w-64 text-sm"
					placeholder="Search employee, branch, or reason"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<div className="flex gap-2">
					<Button
						className={view === "list" ? "bg-indigo-600 text-white" : "bg-white text-indigo-700 border"}
						onClick={() => {
							setView("list");
							setSelectedDay(null);
						}}
					>
						List
					</Button>
					<Button
						className={view === "day" ? "bg-indigo-600 text-white" : "bg-white text-indigo-700 border"}
						onClick={() => {
							setView("day");
							setSelectedDay(format(new Date(), "yyyy-MM-dd"));
						}}
					>
						Day
					</Button>
				</div>
			</div>

			{/* List View: Calendar Picker */}
			{view === "list" && (
				<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4">
					<div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
						<input
							type="date"
							className="border rounded px-2 py-1 text-sm mb-2"
							value={selectedDay || ""}
							onChange={e => setSelectedDay(e.target.value)}
						/>
						<div className="text-xs text-gray-500 mb-2">
							Select a date to view leaves for that day.
						</div>
					</div>
				</div>
			)}

			{/* Show status tabs and leaves only if a date is selected */}
			{selectedDay && (
				<>
					<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-2 flex gap-2">
						{statusTabs.map(tab => (
							<Button
								key={tab.key}
								className={
									statusTab === tab.key
										? "bg-indigo-600 text-white"
										: "bg-white text-indigo-700 border"
								}
								onClick={() => setStatusTab(tab.key as any)}
							>
								{tab.label}
							</Button>
						))}
					</div>
					<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 overflow-auto">
						<div className="mb-4 text-base font-semibold text-indigo-700">
							Leaves on {selectedDay} ({statusMap[statusTab].label})
						</div>
						{leavesOnDay.length === 0 ? (
							<div className="text-center text-gray-400 py-16 text-base">No leaves found.</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
								{leavesOnDay.map(l => (
									<Card key={l.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition">
										<CardContent className="p-5 flex flex-col h-full">
											<div className="flex items-center gap-3 mb-2">
												<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-base font-bold text-indigo-700">
													{l.avatar}
												</div>
												<div>
													<h3 className="font-semibold text-lg text-gray-900 truncate">{l.name}</h3>
													<div className="text-xs text-gray-500">{l.position}</div>
													<div className="flex items-center gap-1 mt-0.5">
														<Badge className="bg-blue-100 text-blue-700 text-[11px]">{l.branch}</Badge>
													</div>
												</div>
											</div>
											<div className="text-xs text-gray-500 mb-2">
												{l.from === l.to
													? `Date: ${l.from}`
													: `From: ${l.from} To: ${l.to}`}
											</div>
											<div className="text-xs text-gray-700 mb-2">Reason: {l.reason}</div>
											<div className="mt-auto flex items-center gap-2 pt-2 border-t">
												<span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${statusMap[l.status as keyof typeof statusMap].color}`}>
													{statusMap[l.status as keyof typeof statusMap].icon}
													{statusMap[l.status as keyof typeof statusMap].label}
												</span>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</div>
				</>
			)}

			{/* Day View: Directly show for today */}
			{view === "day" && !selectedDay && (
				<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4">
					<div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
						<div className="text-xs text-gray-500 mb-2">
							No date selected.
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

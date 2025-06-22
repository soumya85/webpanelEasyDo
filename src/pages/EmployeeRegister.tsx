import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Star, MoreHorizontal } from "lucide-react";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import EmployeeProfileModal from "@/components/EmployeeProfileModal";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const branches = ["All", "Head Office", "New Delhi", "Haldia", "Paradip"];

export const employees = [
	{
		id: "e1",
		name: "Amit Sharma",
		avatar: "AS",
		position: "Software Engineer",
		branch: "Head Office",
		authority: "User",
		doj: "2022-01-15",
		status: "approved",
		reportingManager: "R. Singh",
		rating: 4.5,
	},
	{
		id: "e2",
		name: "Priya Verma",
		avatar: "PV",
		position: "HR Manager",
		branch: "New Delhi",
		authority: "Admin",
		doj: "2021-03-10",
		status: "approved",
		reportingManager: "S. Gupta",
		rating: 4.8,
	},
	{
		id: "e3",
		name: "Rahul Das",
		avatar: "RD",
		position: "Accountant",
		branch: "Haldia",
		authority: "User",
		doj: "2023-07-01",
		status: "pending",
		reportingManager: "A. Roy",
		rating: 4.2,
	},
	{
		id: "e4",
		name: "Sneha Mukherjee",
		avatar: "SM",
		position: "Operations Lead",
		branch: "Paradip",
		authority: "User",
		doj: "2020-11-20",
		status: "approved",
		reportingManager: "R. Singh",
		rating: 4.7,
	},
	{
		id: "e5",
		name: "Vikas Kumar",
		avatar: "VK",
		position: "Sales Executive",
		branch: "Head Office",
		authority: "User",
		doj: "2022-05-18",
		status: "pending",
		reportingManager: "S. Gupta",
		rating: 4.1,
	},
	{
		id: "e6",
		name: "Megha Jain",
		avatar: "MJ",
		position: "Support Engineer",
		branch: "New Delhi",
		authority: "User",
		doj: "2021-09-12",
		status: "approved",
		reportingManager: "A. Roy",
		rating: 4.3,
	},
	{
		id: "e7",
		name: "Rohit Sen",
		avatar: "RS",
		position: "Business Analyst",
		branch: "Haldia",
		authority: "User",
		doj: "2023-02-25",
		status: "rejected",
		reportingManager: "R. Singh",
		rating: 3.9,
	},
	{
		id: "e8",
		name: "Anjali Gupta",
		avatar: "AG",
		position: "Marketing Lead",
		branch: "Paradip",
		authority: "Admin",
		doj: "2020-08-30",
		status: "approved",
		reportingManager: "S. Gupta",
		rating: 4.6,
	},
	{
		id: "e9",
		name: "Deepak Mishra",
		avatar: "DM",
		position: "Logistics Manager",
		branch: "Head Office",
		authority: "User",
		doj: "2022-12-10",
		status: "pending",
		reportingManager: "A. Roy",
		rating: 4.0,
	},
	{
		id: "e10",
		name: "Kavita Singh",
		avatar: "KS",
		position: "Receptionist",
		branch: "New Delhi",
		authority: "User",
		doj: "2021-06-05",
		status: "approved",
		reportingManager: "R. Singh",
		rating: 4.4,
	},
	{
		id: "e11",
		name: "Sourav Ghosh",
		avatar: "SG",
		position: "IT Support",
		branch: "Haldia",
		authority: "User",
		doj: "2023-03-15",
		status: "pending",
		reportingManager: "S. Gupta",
		rating: 4.2,
	},
	{
		id: "e12",
		name: "Neha Agarwal",
		avatar: "NA",
		position: "Finance Manager",
		branch: "Paradip",
		authority: "Admin",
		doj: "2020-10-22",
		status: "approved",
		reportingManager: "A. Roy",
		rating: 4.9,
	},
	{
		id: "e13",
		name: "Manish Tiwari",
		avatar: "MT",
		position: "Warehouse Supervisor",
		branch: "Head Office",
		authority: "User",
		doj: "2022-04-11",
		status: "rejected",
		reportingManager: "R. Singh",
		rating: 3.8,
	},
	{
		id: "e14",
		name: "Pooja Sinha",
		avatar: "PS",
		position: "Procurement Lead",
		branch: "New Delhi",
		authority: "User",
		doj: "2021-08-19",
		status: "approved",
		reportingManager: "S. Gupta",
		rating: 4.5,
	},
	{
		id: "e15",
		name: "Arjun Mehta",
		avatar: "AM",
		position: "Legal Advisor",
		branch: "Haldia",
		authority: "User",
		doj: "2023-01-07",
		status: "pending",
		reportingManager: "A. Roy",
		rating: 4.1,
	},
	{
		id: "e16",
		name: "Divya Kapoor",
		avatar: "DK",
		position: "Admin Executive",
		branch: "Paradip",
		authority: "User",
		doj: "2020-09-14",
		status: "approved",
		reportingManager: "R. Singh",
		rating: 4.7,
	},
	{
		id: "e17",
		name: "Sandeep Yadav",
		avatar: "SY",
		position: "Security Officer",
		branch: "Head Office",
		authority: "User",
		doj: "2022-11-23",
		status: "approved",
		reportingManager: "S. Gupta",
		rating: 4.3,
	},
	{
		id: "e18",
		name: "Ritu Jain",
		avatar: "RJ",
		position: "HR Executive",
		branch: "New Delhi",
		authority: "User",
		doj: "2021-05-28",
		status: "pending",
		reportingManager: "A. Roy",
		rating: 4.0,
	},
	{
		id: "e19",
		name: "Tarun Paul",
		avatar: "TP",
		position: "Driver",
		branch: "Haldia",
		authority: "User",
		doj: "2023-06-02",
		status: "approved",
		reportingManager: "R. Singh",
		rating: 4.2,
	},
	{
		id: "e20",
		name: "Shalini Nair",
		avatar: "SN",
		position: "Office Assistant",
		branch: "Paradip",
		authority: "User",
		doj: "2020-07-17",
		status: "rejected",
		reportingManager: "S. Gupta",
		rating: 3.7,
	}
];

const getStatusCounts = (branch: string) => {
	const filtered = branch === "All" ? employees : employees.filter(e => e.branch === branch);
	const approved = filtered.filter(e => e.status === "approved").length;
	const rejected = filtered.filter(e => e.status === "rejected").length;
	const pending = filtered.filter(e => e.status === "pending").length;
	return { approved, rejected, pending };
};

export default function EmployeeRegister() {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("approved");
	const [showAddModal, setShowAddModal] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
	const [search, setSearch] = useState("");
	const [selectedBranch, setSelectedBranch] = useState("All");

	const { approved, pending, rejected } = getStatusCounts(selectedBranch);

	const filteredEmployees = employees.filter(
		emp =>
			emp.status === activeTab &&
			(selectedBranch === "All" || emp.branch === selectedBranch) &&
			(emp.name.toLowerCase().includes(search.toLowerCase()) ||
				emp.position.toLowerCase().includes(search.toLowerCase()) ||
				emp.branch.toLowerCase().includes(search.toLowerCase()))
	);

	return (
		<main className="flex-1 w-full min-h-0 bg-gray-50 flex flex-col">
			{/* Header - Compact */}
			<header className="bg-white border-b px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2 sticky top-0 z-20">
				<div>
					<h1 className="text-lg font-bold text-blue-700">Employee</h1>
					<nav className="text-xs text-gray-500 mt-0.5">
						<span
							className="text-blue-600 cursor-pointer hover:underline"
							onClick={() => navigate("/company-dashboard")}
						>
							Company Dashboard
						</span>
						{" / Employee"}
					</nav>
				</div>
				<div className="flex items-center gap-2 w-full md:w-auto">
					<div className="relative w-full md:w-48">
						<Input
							placeholder="Search employee, branch, or position"
							value={search}
							onChange={e => setSearch(e.target.value)}
							className="pl-9 py-1 text-sm"
						/>
						<Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
					</div>
					{/* Branch selection dropdown */}
					<Select value={selectedBranch} onValueChange={setSelectedBranch}>
						<SelectTrigger className="w-32 text-sm">
							<SelectValue placeholder="Select branch" />
						</SelectTrigger>
						<SelectContent>
							{branches.map(branch => (
								<SelectItem key={branch} value={branch}>{branch}</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button
						className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 text-sm"
						onClick={() => setShowAddModal(true)}
					>
						<Plus className="w-4 h-4" /> Add
					</Button>
				</div>
			</header>

			{/* Tabs - Compact */}
			<div className="px-4 pt-3">
				<Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="bg-gray-100 rounded w-full max-w-xs h-8">
						<TabsTrigger value="approved" className="text-xs px-2">
							Approved <Badge className="ml-1 bg-green-100 text-green-700">{approved}</Badge>
						</TabsTrigger>
						<TabsTrigger value="pending" className="text-xs px-2">
							Pending <Badge className="ml-1 bg-yellow-100 text-yellow-700">{pending}</Badge>
						</TabsTrigger>
						<TabsTrigger value="rejected" className="text-xs px-2">
							Rejected <Badge className="ml-1 bg-red-100 text-red-700">{rejected}</Badge>
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>

			{/* Employee Cards - Max 4 Columns */}
			<section className="flex-1 px-4 py-4 overflow-auto">
				{filteredEmployees.length === 0 ? (
					<div className="text-center text-gray-400 py-12 text-base">No employees found.</div>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3">
						{filteredEmployees.map(employee => (
							<Card
								key={employee.id}
								className="hover:shadow-lg transition-shadow cursor-pointer group p-0"
								onClick={() => setSelectedEmployee(employee)}
							>
								<CardContent className="p-3">
									<div className="flex items-center gap-2">
										<Avatar className="w-10 h-10">
											<AvatarFallback className="bg-blue-100 text-blue-700 text-base">
												{employee.avatar}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 truncate">{employee.name}</h3>
												<MoreHorizontal className="text-gray-400 w-4 h-4" />
											</div>
											<div className="text-xs text-gray-500 truncate">{employee.position}</div>
											<div className="flex items-center gap-1 mt-0.5">
												<Badge className="bg-blue-100 text-blue-700 text-[10px]">{employee.branch}</Badge>
												<Badge className="bg-gray-100 text-gray-700 text-[10px]">Auth: {employee.authority}</Badge>
											</div>
										</div>
									</div>
									<div className="flex justify-between items-center mt-3 text-xs">
										<div className="text-gray-600 truncate">
											<span className="font-medium">DOJ:</span>{" "}
											<span className="text-gray-900">{employee.doj}</span>
										</div>
										<div>
											<Badge className="bg-blue-50 text-blue-700 font-semibold text-[10px]">
												Auth: {employee.authority}
											</Badge>
										</div>
									</div>
									<div className="mt-2 flex items-center justify-between border-t pt-2">
										<div>
											<span className="text-[10px] text-gray-400">Reporting:</span>{" "}
											<span className="text-xs text-gray-700">{employee.reportingManager}</span>
										</div>
										<div className="flex items-center gap-1">
											<Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
											<span className="text-xs font-medium">{employee.rating}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</section>

			{/* Add Employee Modal */}
			<AddEmployeeModal open={showAddModal} onClose={() => setShowAddModal(false)} />

			{/* Employee Profile Modal */}
			{selectedEmployee && (
				<EmployeeProfileModal
					open={!!selectedEmployee}
					employee={selectedEmployee}
					onClose={() => setSelectedEmployee(null)}
				/>
			)}
		</main>
	);
}

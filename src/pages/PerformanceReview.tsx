import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Search, Star, User, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

// Dummy employee list for review assignment
const employeesList = [
	{ id: "1", name: "Amit Sharma", avatar: "AS", position: "Software Engineer" },
	{ id: "2", name: "Priya Verma", avatar: "PV", position: "HR Manager" },
	{ id: "3", name: "Rahul Das", avatar: "RD", position: "Accountant" },
	{ id: "4", name: "Sneha Mukherjee", avatar: "SM", position: "Operations Lead" },
	{ id: "5", name: "Vikas Kumar", avatar: "VK", position: "Sales Executive" },
];

const periods = ["Q1 2025", "Q4 2024", "Q3 2024", "Q2 2024"];

const initialReviews = [
	{
		id: "1",
		name: "Amit Sharma",
		avatar: "AS",
		position: "Software Engineer",
		branch: "Head Office",
		period: "Q1 2025",
		reviewer: "Priya Verma",
		rating: 4.7,
		status: "Completed",
		summary: "Consistently delivered high-quality code and collaborated well with the team.",
		tags: ["Teamwork", "Quality", "Delivery"],
	},
	{
		id: "2",
		name: "Priya Verma",
		avatar: "PV",
		position: "HR Manager",
		branch: "New Delhi",
		period: "Q1 2025",
		reviewer: "Sneha Mukherjee",
		rating: 4.9,
		status: "Completed",
		summary: "Exceptional leadership and communication skills. Drove key HR initiatives.",
		tags: ["Leadership", "Communication"],
	},
	{
		id: "3",
		name: "Rahul Das",
		avatar: "RD",
		position: "Accountant",
		branch: "Haldia",
		period: "Q1 2025",
		reviewer: "Amit Sharma",
		rating: 4.2,
		status: "Pending",
		summary: "Awaiting review submission.",
		tags: ["Finance"],
	},
	{
		id: "4",
		name: "Sneha Mukherjee",
		avatar: "SM",
		position: "Operations Lead",
		branch: "Paradip",
		period: "Q1 2025",
		reviewer: "Priya Verma",
		rating: 4.8,
		status: "Completed",
		summary: "Excellent operational oversight and process improvements.",
		tags: ["Operations", "Process"],
	},
	{
		id: "5",
		name: "Vikas Kumar",
		avatar: "VK",
		position: "Sales Executive",
		branch: "Head Office",
		period: "Q1 2025",
		reviewer: "Sneha Mukherjee",
		rating: 4.1,
		status: "Pending",
		summary: "Awaiting review submission.",
		tags: ["Sales"],
	},
];

const reviewCriteria = [
	"Technical Skills",
	"Communication",
	"Teamwork",
	"Problem Solving",
	"Punctuality",
	"Creativity",
	"Leadership",
	"Adaptability",
	"Productivity",
	"Initiative",
];

export default function PerformanceReview() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);
	const [selectedStatus, setSelectedStatus] = useState<"All" | "Completed" | "Pending">("All");
	const [reviews, setReviews] = useState(initialReviews);

	// New Review Modal State
	const [openNewReview, setOpenNewReview] = useState(false);
	const [newReview, setNewReview] = useState({
		employeeId: "",
		period: periods[0],
		reviewer: "",
		rating: "",
		summary: "",
		tags: "",
	});
	const [criteriaRatings, setCriteriaRatings] = useState(Array(10).fill(3));

	const filteredReviews = reviews.filter(
		(r) =>
			(selectedPeriod === "All" || r.period === selectedPeriod) &&
			(selectedStatus === "All" || r.status === selectedStatus) &&
			(r.name.toLowerCase().includes(search.toLowerCase()) ||
				r.position.toLowerCase().includes(search.toLowerCase()) ||
				r.branch.toLowerCase().includes(search.toLowerCase()))
	);

	// Handle new review submit
	const handleNewReviewSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const employee = employeesList.find((emp) => emp.id === newReview.employeeId);
		if (!employee) return;
		setReviews([
			{
				id: (reviews.length + 1).toString(),
				name: employee.name,
				avatar: employee.avatar,
				position: employee.position,
				branch: "Head Office",
				period: newReview.period,
				reviewer: newReview.reviewer,
				rating: Number(
					(criteriaRatings.reduce((a, b) => a + b, 0) / criteriaRatings.length
				).toFixed(2)
				), // Ensure rating is a number, not a string
				status: "Completed",
				summary: newReview.summary,
				tags: newReview.tags.split(",").map(t => t.trim()).filter(Boolean),
				// criteriaRatings, // optional: only if your type allows it
			},
			...reviews,
		]);
		setOpenNewReview(false);
		setNewReview({
			employeeId: "",
			period: periods[0],
			reviewer: "",
			rating: "",
			summary: "",
			tags: "",
		});
		setCriteriaRatings(Array(10).fill(3));
	};

	return (
		<div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter flex flex-col">
			{/* Header */}
			<div className="w-full sticky top-0 z-30 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 shadow">
				<div className="max-w-7xl mx-auto flex flex-col gap-1 px-4 py-4">
					<div className="flex items-center gap-3">
						<User className="h-8 w-8 text-white bg-indigo-500 rounded-full p-1 shadow" />
						<div>
							<h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
								Performance Reviews
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
						<span className="text-blue-100">Performance Review</span>
					</nav>
				</div>
			</div>

			{/* Filters */}
			<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
				<div className="flex-1 flex gap-2">
					<Input
						className="w-full md:w-64 text-sm"
						placeholder="Search employee, branch, or position"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<select
						className="border border-indigo-200 rounded px-2 py-1 text-sm bg-white text-indigo-700 focus:border-indigo-400 transition"
						value={selectedPeriod}
						onChange={(e) => setSelectedPeriod(e.target.value)}
					>
						{periods.map((period) => (
							<option key={period} value={period}>
								{period}
							</option>
						))}
						<option value="All">All Periods</option>
					</select>
					<select
						className="border border-indigo-200 rounded px-2 py-1 text-sm bg-white text-indigo-700 focus:border-indigo-400 transition"
						value={selectedStatus}
						onChange={(e) => setSelectedStatus(e.target.value as any)}
					>
						<option value="All">All Status</option>
						<option value="Completed">Completed</option>
						<option value="Pending">Pending</option>
					</select>
				</div>
				<Button
					className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 text-sm rounded shadow"
					onClick={() => setOpenNewReview(true)}
				>
					<Star className="w-4 h-4 mr-1" /> New Review
				</Button>
			</div>

			{/* Review Cards */}
			<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 overflow-auto">
				{filteredReviews.length === 0 ? (
					<div className="text-center text-gray-400 py-16 text-base">No reviews found.</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredReviews.map((review) => (
							<Card
								key={review.id}
								className="hover:shadow-xl transition-shadow cursor-pointer group border-0 bg-white rounded-2xl"
							>
								<CardContent className="p-5 flex flex-col h-full">
									<div className="flex items-center gap-3 mb-2">
										<Avatar className="w-12 h-12">
											<AvatarFallback className="bg-indigo-100 text-indigo-700 text-lg">
												{review.avatar}
											</AvatarFallback>
										</Avatar>
										<div>
											<h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-700 truncate">
												{review.name}
											</h3>
											<div className="text-xs text-gray-500">{review.position}</div>
											<div className="flex items-center gap-1 mt-0.5">
												<Badge className="bg-blue-100 text-blue-700 text-[11px]">
													{review.branch}
												</Badge>
												<Badge className="bg-gray-100 text-gray-700 text-[11px]">
													{review.period}
												</Badge>
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2 mb-2">
										<span className="text-xs text-gray-500">Reviewer:</span>
										<span className="text-xs text-gray-700 font-medium">
											{review.reviewer}
										</span>
									</div>
									<div className="flex items-center gap-2 mb-2">
										<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
										<span className="text-base font-bold text-gray-800">
											{review.rating}
										</span>
										<Badge
											className={
												review.status === "Completed"
													? "bg-green-100 text-green-700 ml-2"
													: "bg-yellow-100 text-yellow-700 ml-2"
											}
										>
											{review.status}
										</Badge>
									</div>
									<div className="flex-1 text-sm text-gray-700 mt-2 mb-2 line-clamp-4">
										{review.summary}
									</div>
									<div className="flex flex-wrap gap-1 mt-auto">
										{review.tags.map((tag) => (
											<Badge
												key={tag}
												className="bg-indigo-50 text-indigo-700 text-[10px]"
											>
												{tag}
											</Badge>
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>

			{/* New Review Modal */}
			<Dialog open={openNewReview} onOpenChange={setOpenNewReview}>
				<DialogContent className="max-w-2xl p-0 overflow-hidden">
					<form onSubmit={handleNewReviewSubmit} className="flex flex-col md:flex-row w-full">
						{/* Left: Form Fields */}
						<div className="flex-1 p-6">
							<DialogHeader>
								<DialogTitle>
									<div className="flex items-center gap-2">
										<Star className="w-5 h-5 text-yellow-500" />
										<span className="text-xl font-bold text-indigo-800">
											New Performance Review
										</span>
									</div>
								</DialogTitle>
							</DialogHeader>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
								<div>
									<label className="block text-xs font-medium text-gray-700 mb-1">
										Employee
									</label>
									<select
										required
										className="w-full border rounded px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-200"
										value={newReview.employeeId}
										onChange={(e) =>
											setNewReview({ ...newReview, employeeId: e.target.value })
										}
									>
										<option value="">Select employee</option>
										{employeesList.map((emp) => (
											<option key={emp.id} value={emp.id}>
												{emp.name} ({emp.position})
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-xs font-medium text-gray-700 mb-1">
										Period
									</label>
									<select
										required
										className="w-full border rounded px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-200"
										value={newReview.period}
										onChange={(e) =>
											setNewReview({ ...newReview, period: e.target.value })
										}
									>
										{periods.map((period) => (
											<option key={period} value={period}>
												{period}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-xs font-medium text-gray-700 mb-1">
										Reviewer
									</label>
									<Input
										required
										className="w-full bg-gray-50"
										placeholder="Reviewer name"
										value={newReview.reviewer}
										onChange={(e) =>
											setNewReview({ ...newReview, reviewer: e.target.value })
										}
									/>
								</div>
								<div>
									<label className="block text-xs font-medium text-gray-700 mb-1">
										Tags (comma separated)
									</label>
									<Input
										className="w-full bg-gray-50"
										placeholder="Teamwork, Quality, Delivery"
										value={newReview.tags}
										onChange={(e) =>
											setNewReview({ ...newReview, tags: e.target.value })
										}
									/>
								</div>
							</div>
							<div className="mt-4">
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Summary
								</label>
								<Textarea
									required
									className="w-full bg-gray-50"
									placeholder="Write a brief summary of the review"
									value={newReview.summary}
									onChange={(e) =>
										setNewReview({ ...newReview, summary: e.target.value })
									}
								/>
							</div>
							<DialogFooter className="mt-6">
								<Button
									type="button"
									variant="ghost"
									onClick={() => setOpenNewReview(false)}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-indigo-600 text-white hover:bg-indigo-700"
								>
									Submit Review
								</Button>
							</DialogFooter>
						</div>
						{/* Right: Criteria Sliders */}
						<div className="bg-indigo-50 md:w-80 w-full p-6 border-l border-indigo-100 flex flex-col">
							<div className="mb-4">
								<h3 className="text-indigo-700 font-semibold text-base mb-1">
									Criteria Ratings
								</h3>
								<p className="text-xs text-gray-500">
									Rate each aspect from 1 (Poor) to 5 (Excellent)
								</p>
							</div>
							<div className="space-y-4 flex-1 overflow-y-auto pr-2">
								{reviewCriteria.map((criteria, idx) => (
									<div key={criteria} className="flex items-center gap-3">
										<span className="w-32 text-xs text-gray-700">{criteria}</span>
										<input
											type="range"
											min={1}
											max={5}
											step={0.1}
											value={criteriaRatings[idx]}
											onChange={(e) => {
												const newRatings = [...criteriaRatings];
												newRatings[idx] = Number(e.target.value);
												setCriteriaRatings(newRatings);
											}}
											className="flex-1 accent-indigo-600"
										/>
										<span className="w-8 text-xs text-indigo-700 text-right font-semibold">
											{criteriaRatings[idx]}
										</span>
									</div>
								))}
							</div>
							<div className="mt-4 flex items-center justify-between">
								<span className="text-xs text-gray-600">Overall</span>
								<span className="text-lg font-bold text-indigo-700">
									{(
										criteriaRatings.reduce((a, b) => a + b, 0) / criteriaRatings.length
									).toFixed(2)}
									<Star className="inline-block w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />
								</span>
							</div>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}

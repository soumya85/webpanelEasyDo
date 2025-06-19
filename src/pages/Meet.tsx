import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

type Meeting = {
    id: string;
    title: string;
    company: string;
    date: string; // ISO string
    time: string; // e.g. "14:00"
    status: "pending" | "completed";
    participants: string[];
    meetingStatus?: "attended" | "missed" | "ignored";
};

const mockMeetings: Meeting[] = [
    {
        id: "1",
        title: "Project Kickoff",
        company: "ABC Corp",
        date: new Date().toISOString().slice(0, 10),
        time: "10:00",
        status: "pending",
        participants: ["Alice", "Bob"],
    },
    {
        id: "2",
        title: "Design Review",
        company: "XYZ Ltd",
        date: new Date().toISOString().slice(0, 10),
        time: "15:00",
        status: "completed",
        participants: ["Alice", "Charlie"],
    },
    {
        id: "3",
        title: "Sprint Planning",
        company: "ABC Corp",
        date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
        time: "11:00",
        status: "pending",
        participants: ["Bob", "Charlie"],
    },
];

function getTodayISO() {
    return new Date().toISOString().slice(0, 10);
}

export default function Meet() {
    const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
    const [tab, setTab] = useState<"pending" | "completed" | "today">("pending");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const filteredMeetings = useMemo(() => {
        let filtered = meetings.filter(m =>
            m.title.toLowerCase().includes(search.toLowerCase()) ||
            m.description?.toLowerCase().includes(search.toLowerCase())
        );
        if (tab === "pending") filtered = filtered.filter(m => m.status === "pending");
        if (tab === "completed") filtered = filtered.filter(m => m.status === "completed");
        if (tab === "today") filtered = filtered.filter(m => m.date === getTodayISO());
        return filtered;
    }, [meetings, search, tab]);

    // Modal state
    const [newTitle, setNewTitle] = useState("");
    const [newDate, setNewDate] = useState(getTodayISO());
    const [newTime, setNewTime] = useState("09:00");
    const [newParticipants, setNewParticipants] = useState("");
    const [newInstructions, setNewInstructions] = useState("");
    const [milestones, setMilestones] = useState<string[]>([]);
    const [repeat, setRepeat] = useState("");
    const [company, setCompany] = useState("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
    const [showParticipantsDropdown, setShowParticipantsDropdown] = useState(false);
    const handleCreateMeeting = () => {
        setMeetings([
            ...meetings,
            {
                id: Date.now().toString(),
                title: newTitle,
                company,
                date: newDate,
                time: newTime,
                status: "pending",
                participants: selectedParticipants,
                instructions: newInstructions,
                milestones,
                repeat,
                attachments,
            },
        ]);
        setShowModal(false);
        setNewTitle("");
        setNewDate(getTodayISO());
        setNewTime("09:00");
        setNewParticipants([]);
        setNewInstructions("");
        setMilestones([]);
        setRepeat("");
        setCompany("");
        setAttachments([]);
    };

    // --- Contact & Group State ---
    const [contacts, setContacts] = useState([
        { id: "1", name: "Alice Smith", email: "alice@email.com" },
        { id: "2", name: "Bob Johnson", email: "bob@email.com" },
    ]);
    const [groups, setGroups] = useState([
        { id: "1", name: "Developers", members: ["Alice Smith", "Bob Johnson"] },
    ]);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [shareContactId, setShareContactId] = useState<string | null>(null);
    const [showCreateContactModal, setShowCreateContactModal] = useState(false);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

    // Contact modal fields
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");

    // Group modal fields
    const [groupName, setGroupName] = useState("");
    const [groupMembers, setGroupMembers] = useState("");

    // Add contact handler
    const handleAddContact = () => {
        setContacts([...contacts, { id: Date.now().toString(), name: contactName, email: contactEmail, phone: contactPhone }]);
        setShowContactModal(false);
        setContactName(""); setContactEmail(""); setContactPhone("");
    };

    // Add group handler
    const [showMembersDropdown, setShowMembersDropdown] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const handleAddGroup = () => {
        setGroups([...groups, { id: Date.now().toString(), name: groupName, members: selectedMembers }]);
        setShowGroupModal(false);
        setShowCreateGroupModal(false);
        setGroupName("");
        setGroupMembers("");
        setSelectedMembers([]);
    };

    const companyStats = useMemo(() => {
        const stats: Record<string, { attended: number; missed: number; ignored: number }> = {};
        meetings.forEach(m => {
            if (!m.company) return;
            if (!stats[m.company]) stats[m.company] = { attended: 0, missed: 0, ignored: 0 };
            if (m.meetingStatus === "attended") stats[m.company].attended += 1;
            else if (m.meetingStatus === "missed") stats[m.company].missed += 1;
            else if (m.meetingStatus === "ignored") stats[m.company].ignored += 1;
        });
        return stats;
    }, [meetings]);

    const [pendingTab, setPendingTab] = useState<"today" | "upcoming" | "all">("today");

    return (
        <main className="flex-1 w-full h-full min-h-0 flex flex-col p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search meetings..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-64 text-sm"
                    />
                    <div className="flex gap-2">
                        <Button
                            variant={tab === "pending" ? "default" : "ghost"}
                            className={`rounded-full px-4 py-1 text-sm ${tab === "pending" ? "bg-blue-700 text-white" : ""}`}
                            onClick={() => setTab("pending")}
                        >
                            Pending
                            <Badge className="ml-2 bg-gray-200 text-gray-700">{meetings.filter(m => m.status === "pending").length}</Badge>
                        </Button>
                        <Button
                            variant={tab === "completed" ? "default" : "ghost"}
                            className={`rounded-full px-4 py-1 text-sm ${tab === "completed" ? "bg-blue-700 text-white" : ""}`}
                            onClick={() => setTab("completed")}
                        >
                            Completed
                            <Badge className="ml-2 bg-gray-200 text-gray-700">{meetings.filter(m => m.status === "completed").length}</Badge>
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        className="bg-green-600 text-white rounded px-3 py-1 text-xs"
                        onClick={() => setShowModal(true)}
                    >
                        + Create Meeting
                    </Button>
                    <Button className="bg-blue-700 text-white rounded px-3 py-1 text-xs" onClick={() => setShowContactModal(true)}>
                        Contacts
                    </Button>
                    <Button className="bg-blue-700 text-white rounded px-3 py-1 text-xs" onClick={() => setShowGroupModal(true)}>
                        Groups
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                {/* Company Meeting Stats */}
                {tab === "completed" && (
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <h2 className="text-lg font-semibold mb-3">Company Meeting Stats</h2>
                        <div className="space-y-4">
                            {Object.entries(companyStats).map(([company, stat]) => {
                                const total = stat.attended + stat.missed + stat.ignored;
                                return (
                                    <div key={company}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium">{company}</span>
                                            <span className="text-xs text-gray-500">
                                                Attended: {stat.attended} &nbsp;|&nbsp; Missed: {stat.missed} &nbsp;|&nbsp; Ignored: {stat.ignored}
                                            </span>
                                        </div>
                                        {/* Simple bar chart */}
                                        <div className="flex h-3 w-full rounded overflow-hidden bg-gray-200">
                                            <div
                                                className="bg-green-500"
                                                style={{ width: `${(stat.attended / total) * 100 || 0}%` }}
                                                title={`Attended: ${stat.attended}`}
                                            />
                                            <div
                                                className="bg-red-500"
                                                style={{ width: `${(stat.missed / total) * 100 || 0}%` }}
                                                title={`Missed: ${stat.missed}`}
                                            />
                                            <div
                                                className="bg-yellow-400"
                                                style={{ width: `${(stat.ignored / total) * 100 || 0}%` }}
                                                title={`Ignored: ${stat.ignored}`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {Object.keys(companyStats).length === 0 && (
                                <div className="text-gray-400 text-sm">No company meeting stats yet.</div>
                            )}
                        </div>
                    </div>
                )}

                {/* Pending Tab: Show Today's, Upcoming, and Scheduled Meetings */}
                {tab === "pending" && (
                    <div>
                        {/* Pending Meetings Sub-Tabs */}
                        <div className="flex gap-2 mb-6">
                            <Button
                                variant={pendingTab === "today" ? "default" : "ghost"}
                                className={`rounded-full px-4 py-1 text-sm ${pendingTab === "today" ? "bg-blue-700 text-white" : ""}`}
                                onClick={() => setPendingTab("today")}
                            >
                                Today's Meetings
                            </Button>
                            <Button
                                variant={pendingTab === "upcoming" ? "default" : "ghost"}
                                className={`rounded-full px-4 py-1 text-sm ${pendingTab === "upcoming" ? "bg-blue-700 text-white" : ""}`}
                                onClick={() => setPendingTab("upcoming")}
                            >
                                Upcoming Meetings
                            </Button>
                            <Button
                                variant={pendingTab === "all" ? "default" : "ghost"}
                                className={`rounded-full px-4 py-1 text-sm ${pendingTab === "all" ? "bg-blue-700 text-white" : ""}`}
                                onClick={() => setPendingTab("all")}
                            >
                                All Scheduled Meetings
                            </Button>
                        </div>

                        {/* Tab Content */}
                        {pendingTab === "today" && (
                            <div>
                                <h3 className="text-base font-semibold mb-2">Today's Meetings</h3>
                                <ul className="space-y-2">
                                    {meetings.filter(m =>
                                        m.status === "pending" && m.date === getTodayISO()
                                    ).length === 0 ? (
                                        <li className="text-gray-400 text-sm">No meetings for today.</li>
                                    ) : (
                                        meetings
                                            .filter(m => m.status === "pending" && m.date === getTodayISO())
                                            .map(meet => (
                                                <li
                                                    key={meet.id}
                                                    className="bg-white rounded-lg shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between border hover:bg-blue-50 transition"
                                                >
                                                    <div>
                                                        <div className="font-medium text-base text-gray-900">{meet.title}</div>
                                                        <div className="flex gap-2 mt-1 text-xs text-gray-600">
                                                            <span><b>Date:</b> {meet.date}</span>
                                                            <span><b>Time:</b> {meet.time}</span>
                                                            <span><b>Participants:</b> {meet.participants.join(", ")}</span>
                                                        </div>
                                                    </div>
                                                    <Badge className="bg-yellow-500 text-white">Today</Badge>
                                                </li>
                                            ))
                                    )}
                                </ul>
                            </div>
                        )}

                        {pendingTab === "upcoming" && (
                            <div>
                                <h3 className="text-base font-semibold mb-2">Upcoming Meetings</h3>
                                <ul className="space-y-2">
                                    {meetings.filter(m =>
                                        m.status === "pending" && m.date > getTodayISO()
                                    ).length === 0 ? (
                                        <li className="text-gray-400 text-sm">No upcoming meetings.</li>
                                    ) : (
                                        meetings
                                            .filter(m => m.status === "pending" && m.date > getTodayISO())
                                            .map(meet => (
                                                <li
                                                    key={meet.id}
                                                    className="bg-white rounded-lg shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between border hover:bg-blue-50 transition"
                                                >
                                                    <div>
                                                        <div className="font-medium text-base text-gray-900">{meet.title}</div>
                                                        <div className="flex gap-2 mt-1 text-xs text-gray-600">
                                                            <span><b>Date:</b> {meet.date}</span>
                                                            <span><b>Time:</b> {meet.time}</span>
                                                            <span><b>Participants:</b> {meet.participants.join(", ")}</span>
                                                        </div>
                                                    </div>
                                                    <Badge className="bg-blue-500 text-white">Upcoming</Badge>
                                                </li>
                                            ))
                                    )}
                                </ul>
                            </div>
                        )}

                        {pendingTab === "all" && (
                            <div>
                                <h3 className="text-base font-semibold mb-2">All Scheduled Meetings</h3>
                                <ul className="space-y-2">
                                    {meetings.filter(m => m.status === "pending").length === 0 ? (
                                        <li className="text-gray-400 text-sm">No scheduled meetings.</li>
                                    ) : (
                                        meetings
                                            .filter(m => m.status === "pending")
                                            .map(meet => (
                                                <li
                                                    key={meet.id}
                                                    className="bg-white rounded-lg shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between border hover:bg-blue-50 transition"
                                                >
                                                    <div>
                                                        <div className="font-medium text-base text-gray-900">{meet.title}</div>
                                                        <div className="flex gap-2 mt-1 text-xs text-gray-600">
                                                            <span><b>Date:</b> {meet.date}</span>
                                                            <span><b>Time:</b> {meet.time}</span>
                                                            <span><b>Participants:</b> {meet.participants.join(", ")}</span>
                                                        </div>
                                                    </div>
                                                    <Badge className="bg-gray-500 text-white">Scheduled</Badge>
                                                </li>
                                            ))
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Completed and Today tabs remain as before */}
                {tab !== "pending" && filteredMeetings.length === 0 ? (
                    <div className="text-center text-gray-400 mt-16">No meetings found.</div>
                ) : tab !== "pending" ? (
                    <ul className="space-y-2">
                        {filteredMeetings.map(meet => (
                            <li
                                key={meet.id}
                                className="bg-white rounded-lg shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between border hover:bg-blue-50 transition"
                            >
                                <div>
                                    <div className="font-medium text-base text-gray-900">{meet.title}</div>
                                    <div className="flex gap-2 mt-1 text-xs text-gray-600">
                                        <span><b>Date:</b> {meet.date}</span>
                                        <span><b>Time:</b> {meet.time}</span>
                                        <span><b>Participants:</b> {meet.participants.join(", ")}</span>
                                    </div>
                                </div>
                                <Badge className={meet.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}>
                                    {meet.status === "completed" ? "Completed" : "Pending"}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>

            {/* Schedule Meeting Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Schedule Meeting</h2>
                        <div className="flex flex-col gap-3">
                            <Input
                                placeholder="Meeting Title"
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                            />
                            <Input
                                type="date"
                                value={newDate}
                                onChange={e => setNewDate(e.target.value)}
                            />
                            <Input
                                type="time"
                                value={newTime}
                                onChange={e => setNewTime(e.target.value)}
                            />
                            {/* Participants Input with dropdown */}
                            <div className="relative">
                                <div
                                    className="border rounded px-3 py-2 text-sm min-h-[38px] flex flex-wrap gap-1 cursor-pointer bg-white"
                                    onClick={() => setShowParticipantsDropdown(v => !v)}
                                    tabIndex={0}
                                    onBlur={() => setTimeout(() => setShowParticipantsDropdown(false), 150)}
                                >
                                    {selectedParticipants.length === 0 && (
                                        <span className="text-gray-400">Select participants...</span>
                                    )}
                                    {selectedParticipants.map(participant => (
                                        <span
                                            key={participant}
                                            className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 flex items-center gap-1"
                                        >
                                            {participant}
                                            <button
                                                type="button"
                                                className="ml-1 text-xs text-red-500"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setSelectedParticipants(selectedParticipants.filter(p => p !== participant));
                                                }}
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                {showParticipantsDropdown && (
                                    <div className="absolute z-10 bg-white border rounded shadow w-full mt-1 max-h-40 overflow-auto">
                                        {contacts
                                            .filter(c => !selectedParticipants.includes(c.name))
                                            .map(c => (
                                                <div
                                                    key={c.id}
                                                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                                                    onClick={() => {
                                                        setSelectedParticipants([...selectedParticipants, c.name]);
                                                        setShowParticipantsDropdown(false);
                                                    }}
                                                >
                                                    {c.name} <span className="text-xs text-gray-400">({c.email})</span>
                                                </div>
                                            ))}
                                        {contacts.filter(c => !selectedParticipants.includes(c.name)).length === 0 && (
                                            <div className="px-3 py-2 text-gray-400 text-sm">No more contacts</div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {/* Instructions */}
                            <textarea
                                className="border rounded px-3 py-2 text-sm"
                                placeholder="Instructions"
                                value={newInstructions}
                                onChange={e => setNewInstructions(e.target.value)}
                                rows={2}
                            />
                            {/* Milestones/Phases */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">Milestones / Phases</span>
                                    <Button
                                        size="sm"
                                        className="px-2 py-0 text-xs"
                                        onClick={() => setMilestones([...milestones, ""])}
                                        type="button"
                                    >
                                        + Add
                                    </Button>
                                </div>
                                {milestones.map((m, idx) => (
                                    <div key={idx} className="flex gap-2 mb-1">
                                        <Input
                                            className="flex-1"
                                            placeholder={`Milestone ${idx + 1}`}
                                            value={m}
                                            onChange={e => {
                                                const arr = [...milestones];
                                                arr[idx] = e.target.value;
                                                setMilestones(arr);
                                            }}
                                        />
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => setMilestones(milestones.filter((_, i) => i !== idx))}
                                            type="button"
                                        >
                                            ×
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            {/* Repeat */}
                            <select
                                className="border rounded px-3 py-2 text-sm"
                                value={repeat}
                                onChange={e => setRepeat(e.target.value)}
                            >
                                <option value="">No Repeat</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="custom">Custom</option>
                            </select>
                            {/* Company/Job */}
                            <Input
                                placeholder="Company Job/Task"
                                value={company}
                                onChange={e => setCompany(e.target.value)}
                            />
                            {/* Attachments */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Attachments</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={e => setAttachments(Array.from(e.target.files || []))}
                                    className="block w-full text-sm"
                                />
                                {attachments.length > 0 && (
                                    <ul className="mt-1 text-xs text-gray-600 list-disc pl-5">
                                        {attachments.map((file, i) => (
                                            <li key={i}>{file.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <Button variant="ghost" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                className="bg-blue-700 text-white"
                                onClick={handleCreateMeeting}
                                disabled={!newTitle}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact List Modal */}
            {showContactModal && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Contacts</h2>
                            <Button
                                className="bg-blue-700 text-white"
                                onClick={() => setShowCreateContactModal(true)}
                            >
                                Create Contact
                            </Button>
                        </div>
                        <ul className="space-y-2 mb-4 max-h-40 overflow-auto">
                            {contacts.map(c => (
                                <li key={c.id} className="flex items-center justify-between border-b pb-1">
                                    <div>
                                        <div className="font-medium text-sm">{c.name}</div>
                                        <div className="text-xs text-gray-500">{c.email}</div>
                                        {c.phone && <div className="text-xs text-gray-400">{c.phone}</div>}
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setShareContactId(c.id)}>
                                        <svg width="16" height="16" fill="none" stroke="currentColor"><path d="M4 12V8a4 4 0 0 1 8 0v4" /><path d="M12 16H4a2 2 0 0 1-2-2V8a6 6 0 1 1 12 0v6a2 2 0 0 1-2 2z" /></svg>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="ghost" onClick={() => setShowContactModal(false)}>Close</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Contact Modal */}
            {showCreateContactModal && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Create Contact</h2>
                        <div className="flex flex-col gap-2 mb-2">
                            <Input placeholder="Name" value={contactName} onChange={e => setContactName(e.target.value)} />
                            <Input placeholder="Email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
                            <Input placeholder="Phone" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="ghost" onClick={() => setShowCreateContactModal(false)}>Cancel</Button>
                            <Button
                                className="bg-blue-700 text-white"
                                onClick={() => {
                                    handleAddContact();
                                    setShowCreateContactModal(false);
                                    setShowContactModal(false);
                                }}
                                disabled={!contactName || !contactEmail}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Group List Modal */}
            {showGroupModal && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Groups</h2>
                            <Button
                                className="bg-blue-700 text-white"
                                onClick={() => setShowCreateGroupModal(true)}
                            >
                                Create Group
                            </Button>
                        </div>
                        <ul className="space-y-2 mb-4 max-h-40 overflow-auto">
                            {groups.map(g => (
                                <li key={g.id} className="border-b pb-1">
                                    <div className="font-medium text-sm">{g.name}</div>
                                    <div className="text-xs text-gray-500">Members: {g.members.join(", ")}</div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="ghost" onClick={() => setShowGroupModal(false)}>Close</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Group Modal */}
            {showCreateGroupModal && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Create Group</h2>
                        <div className="flex flex-col gap-2 mb-2">
                            <Input
                                placeholder="Group Name"
                                value={groupName}
                                onChange={e => setGroupName(e.target.value)}
                            />
                            {/* Members Input with dropdown */}
                            <div className="relative">
                                <div
                                    className="border rounded px-3 py-2 text-sm min-h-[38px] flex flex-wrap gap-1 cursor-pointer bg-white"
                                    onClick={() => setShowMembersDropdown(v => !v)}
                                    tabIndex={0}
                                    onBlur={() => setTimeout(() => setShowMembersDropdown(false), 150)}
                                >
                                    {selectedMembers.length === 0 && (
                                        <span className="text-gray-400">Select members...</span>
                                    )}
                                    {selectedMembers.map(member => (
                                        <span
                                            key={member}
                                            className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 flex items-center gap-1"
                                        >
                                            {member}
                                            <button
                                                type="button"
                                                className="ml-1 text-xs text-red-500"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setSelectedMembers(selectedMembers.filter(m => m !== member));
                                                }}
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                {showMembersDropdown && (
                                    <div className="absolute z-10 bg-white border rounded shadow w-full mt-1 max-h-40 overflow-auto">
                                        {contacts
                                            .filter(c => !selectedMembers.includes(c.name))
                                            .map(c => (
                                                <div
                                                    key={c.id}
                                                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                                                    onClick={() => {
                                                        setSelectedMembers([...selectedMembers, c.name]);
                                                        setShowMembersDropdown(false);
                                                    }}
                                                >
                                                    {c.name} <span className="text-xs text-gray-400">({c.email})</span>
                                                </div>
                                            ))}
                                        {contacts.filter(c => !selectedMembers.includes(c.name)).length === 0 && (
                                            <div className="px-3 py-2 text-gray-400 text-sm">No more contacts</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="ghost" onClick={() => {
                                setShowCreateGroupModal(false);
                                setSelectedMembers([]);
                            }}>Cancel</Button>
                            <Button
                                className="bg-blue-700 text-white"
                                onClick={handleAddGroup}
                                disabled={!groupName || selectedMembers.length === 0}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Contact Modal */}
            {shareContactId && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">Share Contact</h2>
                        <div className="mb-4">Share <b>{contacts.find(c => c.id === shareContactId)?.name}</b> with:</div>
                        <Input placeholder="Enter email or group name" />
                        <div className="flex justify-end gap-2 mt-6">
                            <Button variant="ghost" onClick={() => setShareContactId(null)}>Cancel</Button>
                            <Button className="bg-blue-700 text-white" onClick={() => setShareContactId(null)}>Share</Button>
                        </div>
                    </div>
                </div>
            )}


        </main>
    );
}

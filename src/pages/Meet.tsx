import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Users,
  CalendarDays,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronRight,
} from "lucide-react";

type Meeting = {
  id: string;
  title: string;
  company: string;
  date: string;
  time: string;
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

const statusMap = {
  attended: {
    label: "Attended",
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  },
  missed: {
    label: "Missed",
    color: "bg-red-100 text-red-700",
    icon: <XCircle className="w-4 h-4 text-red-500" />,
  },
  ignored: {
    label: "Ignored",
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock className="w-4 h-4 text-yellow-500" />,
  },
};

export default function Meet() {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [tab, setTab] = useState<"pending" | "completed" | "today">("pending");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredMeetings = useMemo(() => {
    let filtered = meetings.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase()),
    );
    if (tab === "pending")
      filtered = filtered.filter((m) => m.status === "pending");
    if (tab === "completed")
      filtered = filtered.filter((m) => m.status === "completed");
    if (tab === "today")
      filtered = filtered.filter((m) => m.date === getTodayISO());
    return filtered;
  }, [meetings, search, tab]);

  // Modal state
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState(getTodayISO());
  const [newTime, setNewTime] = useState("09:00");
  const [newParticipants, setNewParticipants] = useState("");
  const [company, setCompany] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    [],
  );
  const [showParticipantsDropdown, setShowParticipantsDropdown] =
    useState(false);

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
      },
    ]);
    setShowModal(false);
    setNewTitle("");
    setNewDate(getTodayISO());
    setNewTime("09:00");
    setNewParticipants("");
    setCompany("");
    setSelectedParticipants([]);
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
  const [showCreateContactModal, setShowCreateContactModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  // Contact modal fields
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Group modal fields
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showMembersDropdown, setShowMembersDropdown] = useState(false);

  // Add contact handler
  const handleAddContact = () => {
    setContacts([
      ...contacts,
      {
        id: Date.now().toString(),
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
      },
    ]);
    setShowContactModal(false);
    setContactName("");
    setContactEmail("");
    setContactPhone("");
  };

  // Add group handler
  const handleAddGroup = () => {
    setGroups([
      ...groups,
      { id: Date.now().toString(), name: groupName, members: selectedMembers },
    ]);
    setShowGroupModal(false);
    setShowCreateGroupModal(false);
    setGroupName("");
    setSelectedMembers([]);
  };

  // Company stats
  const companyStats = useMemo(() => {
    const stats: Record<
      string,
      { attended: number; missed: number; ignored: number }
    > = {};
    meetings.forEach((m) => {
      if (!m.company) return;
      if (!stats[m.company])
        stats[m.company] = { attended: 0, missed: 0, ignored: 0 };
      if (m.meetingStatus === "attended") stats[m.company].attended += 1;
      else if (m.meetingStatus === "missed") stats[m.company].missed += 1;
      else if (m.meetingStatus === "ignored") stats[m.company].ignored += 1;
    });
    return stats;
  }, [meetings]);

  const [pendingTab, setPendingTab] = useState<"today" | "upcoming" | "all">(
    "today",
  );

  return (
    <main className="flex-1 w-full min-h-0 flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter">
      {/* Header */}
      <div className="w-full sticky top-0 z-30 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 shadow">
        <div className="max-w-7xl mx-auto flex flex-col gap-1 px-4 py-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-white bg-indigo-500 rounded-full p-1 shadow" />
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
                Meetings
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <Input
          placeholder="Search meetings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 text-sm"
        />
        <div className="flex gap-2">
          <Button
            variant={tab === "pending" ? "default" : "ghost"}
            className={`rounded-full px-4 py-1 text-sm ${tab === "pending" ? "bg-blue-700 text-white" : ""}`}
            onClick={() => setTab("pending")}
          >
            Pending
            <Badge className="ml-2 bg-gray-200 text-gray-700">
              {meetings.filter((m) => m.status === "pending").length}
            </Badge>
          </Button>
          <Button
            variant={tab === "completed" ? "default" : "ghost"}
            className={`rounded-full px-4 py-1 text-sm ${tab === "completed" ? "bg-blue-700 text-white" : ""}`}
            onClick={() => setTab("completed")}
          >
            Completed
            <Badge className="ml-2 bg-gray-200 text-gray-700">
              {meetings.filter((m) => m.status === "completed").length}
            </Badge>
          </Button>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button
            className="bg-green-600 text-white rounded px-3 py-1 text-xs"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4 mr-1" />{" "}
            <ReactiveMultilingualText translationKey="createMeeting" />
          </Button>
          <Button
            className="bg-blue-700 text-white rounded px-3 py-1 text-xs"
            onClick={() => setShowContactModal(true)}
          >
            Contacts
          </Button>
          <Button
            className="bg-blue-700 text-white rounded px-3 py-1 text-xs"
            onClick={() => setShowGroupModal(true)}
          >
            Groups
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 overflow-auto">
        {/* Company Meeting Stats */}
        {tab === "completed" && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Company Meeting Stats
            </h2>
            <div className="space-y-4">
              {Object.entries(companyStats).map(([company, stat]) => {
                const total = stat.attended + stat.missed + stat.ignored;
                return (
                  <div key={company}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{company}</span>
                      <span className="text-xs text-gray-500">
                        Attended: {stat.attended} &nbsp;|&nbsp; Missed:{" "}
                        {stat.missed} &nbsp;|&nbsp; Ignored: {stat.ignored}
                      </span>
                    </div>
                    <div className="flex h-3 w-full rounded overflow-hidden bg-gray-200">
                      <div
                        className="bg-green-500"
                        style={{
                          width: `${(stat.attended / total) * 100 || 0}%`,
                        }}
                        title={`Attended: ${stat.attended}`}
                      />
                      <div
                        className="bg-red-500"
                        style={{
                          width: `${(stat.missed / total) * 100 || 0}%`,
                        }}
                        title={`Missed: ${stat.missed}`}
                      />
                      <div
                        className="bg-yellow-400"
                        style={{
                          width: `${(stat.ignored / total) * 100 || 0}%`,
                        }}
                        title={`Ignored: ${stat.ignored}`}
                      />
                    </div>
                  </div>
                );
              })}
              {Object.keys(companyStats).length === 0 && (
                <div className="text-gray-400 text-sm">
                  No company meeting stats yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pending Tab: Show Today's, Upcoming, and Scheduled Meetings */}
        {tab === "pending" && (
          <div>
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
            {pendingTab === "today" && (
              <div>
                <h3 className="text-base font-semibold mb-2">
                  Today's Meetings
                </h3>
                <ul className="space-y-2">
                  {meetings.filter(
                    (m) => m.status === "pending" && m.date === getTodayISO(),
                  ).length === 0 ? (
                    <li className="text-gray-400 text-sm">
                      No meetings for today.
                    </li>
                  ) : (
                    meetings
                      .filter(
                        (m) =>
                          m.status === "pending" && m.date === getTodayISO(),
                      )
                      .map((meet) => (
                        <li
                          key={meet.id}
                          className="bg-white rounded-xl shadow px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between border hover:bg-blue-50 transition"
                        >
                          <div>
                            <div className="font-medium text-base text-gray-900">
                              {meet.title}
                            </div>
                            <div className="flex gap-2 mt-1 text-xs text-gray-600">
                              <span>
                                <b>Date:</b> {meet.date}
                              </span>
                              <span>
                                <b>Time:</b> {meet.time}
                              </span>
                              <span>
                                <b>Participants:</b>{" "}
                                {meet.participants.join(", ")}
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-yellow-500 text-white">
                            Today
                          </Badge>
                        </li>
                      ))
                  )}
                </ul>
              </div>
            )}
            {pendingTab === "upcoming" && (
              <div>
                <h3 className="text-base font-semibold mb-2">
                  Upcoming Meetings
                </h3>
                <ul className="space-y-2">
                  {meetings.filter(
                    (m) => m.status === "pending" && m.date > getTodayISO(),
                  ).length === 0 ? (
                    <li className="text-gray-400 text-sm">
                      No upcoming meetings.
                    </li>
                  ) : (
                    meetings
                      .filter(
                        (m) => m.status === "pending" && m.date > getTodayISO(),
                      )
                      .map((meet) => (
                        <li
                          key={meet.id}
                          className="bg-white rounded-xl shadow px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between border hover:bg-blue-50 transition"
                        >
                          <div>
                            <div className="font-medium text-base text-gray-900">
                              {meet.title}
                            </div>
                            <div className="flex gap-2 mt-1 text-xs text-gray-600">
                              <span>
                                <b>Date:</b> {meet.date}
                              </span>
                              <span>
                                <b>Time:</b> {meet.time}
                              </span>
                              <span>
                                <b>Participants:</b>{" "}
                                {meet.participants.join(", ")}
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-blue-500 text-white">
                            Upcoming
                          </Badge>
                        </li>
                      ))
                  )}
                </ul>
              </div>
            )}
            {pendingTab === "all" && (
              <div>
                <h3 className="text-base font-semibold mb-2">
                  All Scheduled Meetings
                </h3>
                <ul className="space-y-2">
                  {meetings.filter((m) => m.status === "pending").length ===
                  0 ? (
                    <li className="text-gray-400 text-sm">
                      No scheduled meetings.
                    </li>
                  ) : (
                    meetings
                      .filter((m) => m.status === "pending")
                      .map((meet) => (
                        <li
                          key={meet.id}
                          className="bg-white rounded-xl shadow px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between border hover:bg-blue-50 transition"
                        >
                          <div>
                            <div className="font-medium text-base text-gray-900">
                              {meet.title}
                            </div>
                            <div className="flex gap-2 mt-1 text-xs text-gray-600">
                              <span>
                                <b>Date:</b> {meet.date}
                              </span>
                              <span>
                                <b>Time:</b> {meet.time}
                              </span>
                              <span>
                                <b>Participants:</b>{" "}
                                {meet.participants.join(", ")}
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-gray-500 text-white">
                            Scheduled
                          </Badge>
                        </li>
                      ))
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Completed Tab */}
        {tab === "completed" && filteredMeetings.length === 0 ? (
          <div className="text-center text-gray-400 mt-16">
            No meetings found.
          </div>
        ) : tab === "completed" ? (
          <ul className="space-y-2">
            {filteredMeetings.map((meet) => (
              <li
                key={meet.id}
                className="bg-white rounded-xl shadow px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between border hover:bg-blue-50 transition"
              >
                <div>
                  <div className="font-medium text-base text-gray-900">
                    {meet.title}
                  </div>
                  <div className="flex gap-2 mt-1 text-xs text-gray-600">
                    <span>
                      <b>Date:</b> {meet.date}
                    </span>
                    <span>
                      <b>Time:</b> {meet.time}
                    </span>
                    <span>
                      <b>Participants:</b> {meet.participants.join(", ")}
                    </span>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">Completed</Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Schedule Meeting Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Schedule Meeting</h2>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Meeting Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
              {/* Participants Input with dropdown */}
              <div className="relative">
                <div
                  className="border rounded px-3 py-2 text-sm min-h-[38px] flex flex-wrap gap-1 cursor-pointer bg-white"
                  onClick={() => setShowParticipantsDropdown((v) => !v)}
                  tabIndex={0}
                  onBlur={() =>
                    setTimeout(() => setShowParticipantsDropdown(false), 150)
                  }
                >
                  {selectedParticipants.length === 0 && (
                    <span className="text-gray-400">
                      Select participants...
                    </span>
                  )}
                  {selectedParticipants.map((participant) => (
                    <span
                      key={participant}
                      className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 flex items-center gap-1"
                    >
                      {participant}
                      <button
                        type="button"
                        className="ml-1 text-xs text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedParticipants(
                            selectedParticipants.filter(
                              (p) => p !== participant,
                            ),
                          );
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
                      .filter((c) => !selectedParticipants.includes(c.name))
                      .map((c) => (
                        <div
                          key={c.id}
                          className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                          onClick={() => {
                            setSelectedParticipants([
                              ...selectedParticipants,
                              c.name,
                            ]);
                            setShowParticipantsDropdown(false);
                          }}
                        >
                          {c.name}{" "}
                          <span className="text-xs text-gray-400">
                            ({c.email})
                          </span>
                        </div>
                      ))}
                    {contacts.filter(
                      (c) => !selectedParticipants.includes(c.name),
                    ).length === 0 && (
                      <div className="px-3 py-2 text-gray-400 text-sm">
                        No more contacts
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Input
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
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
                <ReactiveMultilingualText translationKey="create" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contact List Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Contacts</h2>
              <Button
                className="bg-blue-700 text-white"
                onClick={() => setShowCreateContactModal(true)}
              >
                + <ReactiveMultilingualText translationKey="createContact" />
              </Button>
            </div>
            <ul className="space-y-2 mb-4 max-h-40 overflow-auto">
              {contacts.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between border-b pb-1"
                >
                  <div>
                    <div className="font-medium text-sm">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.email}</div>
                    {c.phone && (
                      <div className="text-xs text-gray-400">{c.phone}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="ghost"
                onClick={() => setShowContactModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Contact Modal */}
      {showCreateContactModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Create Contact</h2>
            <div className="flex flex-col gap-2 mb-2">
              <Input
                placeholder="Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <Input
                placeholder="Phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="ghost"
                onClick={() => setShowCreateContactModal(false)}
              >
                Cancel
              </Button>
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
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Groups</h2>
              <Button
                className="bg-blue-700 text-white"
                onClick={() => setShowCreateGroupModal(true)}
              >
                + Create Group
              </Button>
            </div>
            <ul className="space-y-2 mb-4 max-h-40 overflow-auto">
              {groups.map((g) => (
                <li key={g.id} className="border-b pb-1">
                  <div className="font-medium text-sm">{g.name}</div>
                  <div className="text-xs text-gray-500">
                    Members: {g.members.join(", ")}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="ghost" onClick={() => setShowGroupModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Create Group</h2>
            <div className="flex flex-col gap-2 mb-2">
              <Input
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              {/* Members Input with dropdown */}
              <div className="relative">
                <div
                  className="border rounded px-3 py-2 text-sm min-h-[38px] flex flex-wrap gap-1 cursor-pointer bg-white"
                  onClick={() => setShowMembersDropdown((v) => !v)}
                  tabIndex={0}
                  onBlur={() =>
                    setTimeout(() => setShowMembersDropdown(false), 150)
                  }
                >
                  {selectedMembers.length === 0 && (
                    <span className="text-gray-400">Select members...</span>
                  )}
                  {selectedMembers.map((member) => (
                    <span
                      key={member}
                      className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 flex items-center gap-1"
                    >
                      {member}
                      <button
                        type="button"
                        className="ml-1 text-xs text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMembers(
                            selectedMembers.filter((m) => m !== member),
                          );
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
                      .filter((c) => !selectedMembers.includes(c.name))
                      .map((c) => (
                        <div
                          key={c.id}
                          className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                          onClick={() => {
                            setSelectedMembers([...selectedMembers, c.name]);
                            setShowMembersDropdown(false);
                          }}
                        >
                          {c.name}{" "}
                          <span className="text-xs text-gray-400">
                            ({c.email})
                          </span>
                        </div>
                      ))}
                    {contacts.filter((c) => !selectedMembers.includes(c.name))
                      .length === 0 && (
                      <div className="px-3 py-2 text-gray-400 text-sm">
                        No more contacts
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowCreateGroupModal(false);
                  setSelectedMembers([]);
                }}
              >
                Cancel
              </Button>
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
    </main>
  );
}

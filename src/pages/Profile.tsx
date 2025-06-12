import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { PageLayout } from "@/components/layout/PageLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useUser, getUserInitials, getProfileImageSrc } from "@/hooks/useUser";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Shield,
  Camera,
  Edit3,
  Save,
  X,
  Activity,
  Clock,
  Settings,
  Bell,
  Lock,
  Globe,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  Download,
  Upload,
  Trash2,
  UserCheck,
  Award,
  Target,
  TrendingUp,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "update" | "view" | "meeting" | "approval";
  title: string;
  description: string;
  time: string;
  status?: "completed" | "pending" | "cancelled";
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  updates: boolean;
  security: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "private" | "contacts";
  showEmail: boolean;
  showPhone: boolean;
  showActivity: boolean;
  allowMessages: boolean;
}

const Profile = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data - replace with real data
  const [editingUser, setEditingUser] = useState({
    ...user,
    bio: "Passionate software developer with 5+ years of experience in React and Node.js",
    website: "https://johndoe.dev",
    location: "San Francisco, CA",
    department: "Engineering",
    jobTitle: "Senior Software Engineer",
    manager: "Sarah Wilson",
    employeeId: "EMP-2024-001",
    startDate: "2020-03-15",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    languages: ["English", "Spanish", "French"],
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    updates: true,
    security: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "public",
    showEmail: true,
    showPhone: false,
    showActivity: true,
    allowMessages: true,
  });

  // Sample activity data
  const recentActivity: ActivityItem[] = [
    {
      id: "1",
      type: "update",
      title: "Profile Updated",
      description: "Updated contact information and bio",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: "2",
      type: "meeting",
      title: "Team Standup",
      description: "Daily team sync meeting",
      time: "4 hours ago",
      status: "completed",
    },
    {
      id: "3",
      type: "approval",
      title: "Leave Request",
      description: "Annual leave request for next week",
      time: "1 day ago",
      status: "pending",
    },
    {
      id: "4",
      type: "view",
      title: "Document Access",
      description: "Viewed Q4 performance report",
      time: "2 days ago",
      status: "completed",
    },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would save the changes to your backend
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingUser({ ...user });
    setProfileImagePreview(null);
    setIsEditing(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setProfileImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePrivacyChange = (
    key: keyof PrivacySettings,
    value: boolean | string,
  ) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const exportData = () => {
    // Mock export functionality
    toast({
      title: "Data Export",
      description:
        "Your data export has been initiated. You'll receive an email when it's ready.",
    });
  };

  const deleteAccount = () => {
    // Mock delete account functionality
    toast({
      title: "Account Deletion",
      description:
        "Account deletion request has been submitted. You'll receive a confirmation email.",
      variant: "destructive",
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "update":
        return <Edit3 className="h-4 w-4 text-blue-500" />;
      case "view":
        return <Activity className="h-4 w-4 text-green-500" />;
      case "meeting":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case "approval":
        return <Shield className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCurrentProfileImage = () => {
    return profileImagePreview || getProfileImageSrc(user);
  };

  const displayUser = isEditing ? editingUser : user;

  return (
    <PageLayout>
      <div className="w-full p-3 sm:p-4 lg:p-6 font-inter">
        <div className="flex w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6">
          {/* Breadcrumb Section */}
          <div
            className={cn(
              "flex min-h-[50px] sm:min-h-[60px] lg:min-h-[65px]",
              "px-4 py-3 sm:px-6 sm:py-3 lg:px-[30px] lg:py-[13.5px]",
              "justify-between items-center self-stretch",
              "rounded-lg border-l-[6px] border-[#4766E5] bg-white",
              "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
            )}
          >
            <div className="flex justify-start items-center gap-2 sm:gap-[8px] lg:gap-[10px] flex-1">
              <div className="text-[#283C50] font-inter text-base sm:text-xl lg:text-base font-bold leading-[20px] sm:leading-[24px] lg:leading-[19.2px]">
                Profile
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle className="text-xl font-semibold">
                      Personal Information
                    </CardTitle>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                            className="gap-2"
                          >
                            <X className="h-4 w-4" />
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSave}
                            className="gap-2"
                          >
                            <Save className="h-4 w-4" />
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          onClick={handleEdit}
                          className="gap-2"
                        >
                          <Edit3 className="h-4 w-4" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Image Section */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage
                          src={getCurrentProfileImage()}
                          alt={displayUser.name}
                        />
                        <AvatarFallback className="text-lg">
                          {getUserInitials(displayUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="icon"
                          variant="outline"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                          onClick={handleImageUpload}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {displayUser.name}
                      </h3>
                      <p className="text-gray-600">{editingUser.jobTitle}</p>
                      <p className="text-sm text-gray-500">
                        {editingUser.department}
                      </p>
                      {isEditing && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleImageUpload}
                            className="gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            Upload Photo
                          </Button>
                          {profileImagePreview && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleRemoveImage}
                              className="gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  <Separator />

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editingUser.name}
                          onChange={(e) =>
                            setEditingUser((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <p className="text-gray-900">{displayUser.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editingUser.email}
                          onChange={(e) =>
                            setEditingUser((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <p className="text-gray-900">{displayUser.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editingUser.phone || ""}
                          onChange={(e) =>
                            setEditingUser((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <p className="text-gray-900">
                          {displayUser.phone || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={editingUser.location || ""}
                          onChange={(e) =>
                            setEditingUser((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <p className="text-gray-900">
                          {editingUser.location || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Professional Information */}
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">
                      Professional Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        {isEditing ? (
                          <Input
                            id="jobTitle"
                            value={editingUser.jobTitle || ""}
                            onChange={(e) =>
                              setEditingUser((prev) => ({
                                ...prev,
                                jobTitle: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <p className="text-gray-900">
                            {editingUser.jobTitle || "Not provided"}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        {isEditing ? (
                          <Select
                            value={editingUser.department || ""}
                            onValueChange={(value) =>
                              setEditingUser((prev) => ({
                                ...prev,
                                department: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Engineering">
                                Engineering
                              </SelectItem>
                              <SelectItem value="Product">Product</SelectItem>
                              <SelectItem value="Design">Design</SelectItem>
                              <SelectItem value="Marketing">
                                Marketing
                              </SelectItem>
                              <SelectItem value="Sales">Sales</SelectItem>
                              <SelectItem value="HR">HR</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-gray-900">
                            {editingUser.department || "Not provided"}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="manager">Manager</Label>
                        {isEditing ? (
                          <Input
                            id="manager"
                            value={editingUser.manager || ""}
                            onChange={(e) =>
                              setEditingUser((prev) => ({
                                ...prev,
                                manager: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <p className="text-gray-900">
                            {editingUser.manager || "Not provided"}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employeeId">Employee ID</Label>
                        <p className="text-gray-900">
                          {editingUser.employeeId || "Not assigned"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={editingUser.bio || ""}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            bio: e.target.value,
                          }))
                        }
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-900">
                        {editingUser.bio || "No bio provided"}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {editingUser.skills?.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Start Date</span>
                    </div>
                    <span className="text-sm font-medium">
                      {editingUser.startDate || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Performance</span>
                    </div>
                    <Badge>Excellent</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Goals Met</span>
                    </div>
                    <span className="text-sm font-medium">8/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Growth</span>
                    </div>
                    <Badge variant="outline">+15%</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Settings Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Privacy
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Security
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Settings Tabs */}
          <div className="w-full">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "notifications", name: "Notifications", icon: Bell },
                  { id: "privacy", name: "Privacy", icon: Eye },
                  { id: "security", name: "Security", icon: Lock },
                  { id: "activity", name: "Activity", icon: Activity },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm",
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-6">
              {activeTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <Label className="capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </Label>
                          <p className="text-sm text-gray-500">
                            Receive {key} notifications
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={() =>
                            handleNotificationChange(
                              key as keyof NotificationSettings,
                            )
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === "privacy" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Profile Visibility</Label>
                      <Select
                        value={privacy.profileVisibility}
                        onValueChange={(value) =>
                          handlePrivacyChange("profileVisibility", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="contacts">
                            Contacts Only
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {Object.entries(privacy)
                      .filter(([key]) => key !== "profileVisibility")
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <Label className="capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                            <p className="text-sm text-gray-500">
                              Allow others to see your{" "}
                              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                            </p>
                          </div>
                          <Switch
                            checked={value as boolean}
                            onCheckedChange={(checked) =>
                              handlePrivacyChange(
                                key as keyof PrivacySettings,
                                checked,
                              )
                            }
                          />
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === "security" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button>Update Password</Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable 2FA</p>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium text-red-600">Danger Zone</h4>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" onClick={exportData}>
                          <Download className="h-4 w-4 mr-2" />
                          Export Data
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Account
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={deleteAccount}>
                                Delete Account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "activity" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;

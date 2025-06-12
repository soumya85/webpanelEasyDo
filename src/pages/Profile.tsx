import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="mt-2 text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Card */}
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
                      <Button size="sm" onClick={handleSave} className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={handleEdit} className="gap-2">
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

              {/* Bio Section */}
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
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start gap-2">
              <Bell className="h-4 w-4" />
              Notification Settings
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Lock className="h-4 w-4" />
              Privacy Settings
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Shield className="h-4 w-4" />
              Security Settings
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

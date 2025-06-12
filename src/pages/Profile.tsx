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
  Upload,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  position: string;
  employeeId: string;
  joinDate: string;
  bio: string;
  profileImage: string | null;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  taskReminders: boolean;
  meetingAlerts: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: string;
  loginNotifications: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "settings" | "activity"
  >("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Bhaskar Ghosh",
    email: "bhaskar.ghosh@libertyhighrise.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra, India",
    department: "Executive Management",
    position: "Executive Director",
    employeeId: "LH001",
    joinDate: "2018-01-15",
    bio: "Experienced executive director with over 15 years in the industry. Leading digital transformation initiatives and strategic planning for Liberty Highrise.",
    profileImage: null,
  });

  const [originalData, setOriginalData] = useState(profileData);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    taskReminders: true,
    meetingAlerts: true,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: true,
    sessionTimeout: "30",
    loginNotifications: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const recentActivities = [
    {
      action: "Updated salary data chart",
      time: "2 hours ago",
      type: "update",
    },
    {
      action: "Reviewed monthly reports",
      time: "4 hours ago",
      type: "view",
    },
    {
      action: "Attended board meeting",
      time: "1 day ago",
      type: "meeting",
    },
    {
      action: "Approved new employee onboarding",
      time: "2 days ago",
      type: "approval",
    },
    {
      action: "Updated company policies",
      time: "3 days ago",
      type: "update",
    },
  ];

  const handleEdit = () => {
    setOriginalData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    // Validation
    if (!profileData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    if (!profileData.email.trim() || !isValidEmail(profileData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // If there's a preview image, update the profile image
    if (profileImagePreview) {
      setProfileData((prev) => ({
        ...prev,
        profileImage: profileImagePreview,
      }));
      setProfileImagePreview(null);
    }

    setIsEditing(false);
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });

    // Here you would typically save to backend
    console.log("Saving profile data:", profileData);
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setProfileImagePreview(null);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please select a valid image file",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImagePreview(null);
    setProfileData((prev) => ({
      ...prev,
      profileImage: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handlePasswordChange = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (security.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically validate current password and update
    toast({
      title: "Success",
      description: "Password updated successfully",
    });

    setSecurity((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
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
    return (
      profileImagePreview ||
      profileData.profileImage ||
      "/api/placeholder/128/128"
    );
  };

  return (
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
            <div className="text-[#DBD9D9] font-inter text-sm sm:text-base font-normal leading-[16px] sm:leading-[19.2px] hidden sm:block">
              |
            </div>
            <div className="text-[#283C50] font-inter text-xs sm:text-[13px] font-bold leading-[16px] sm:leading-[20.8px] hidden sm:block">
              User Management
            </div>
          </div>

          {!isEditing && (
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </Button>
          )}

          {isEditing && (
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Profile Header Card */}
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                    <AvatarImage
                      src={getCurrentProfileImage()}
                      alt={profileData.name}
                    />
                    <AvatarFallback className="bg-azure-24 text-white text-2xl sm:text-3xl font-bold">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      {(profileData.profileImage || profileImagePreview) && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="icon"
                              variant="destructive"
                              className="h-8 w-8 rounded-full"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove Profile Picture
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove your profile
                                picture? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleRemoveImage}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {isEditing && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">
                      Upload a new profile picture
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Choose File
                    </Button>
                    <p className="text-xs text-gray-400 mt-1">
                      Max size: 5MB. Supported: JPG, PNG, GIF
                    </p>
                  </div>
                )}

                <div className="text-center">
                  <Badge
                    variant="default"
                    className="bg-primary text-white px-3 py-1"
                  >
                    Authority Level 1
                  </Badge>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-base font-semibold text-azure-24">
                          {profileData.name}
                        </span>
                        <div className="flex items-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 13 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2"
                          >
                            <path
                              d="M6.5 0.65625L0.5 3.34375V7.34375C0.5 11.0312 3.0625 14.5 6.5 15.3438C9.9375 14.5 12.5 11.0312 12.5 7.34375V3.34375L6.5 0.65625ZM11.1562 7.34375C11.1562 10.3438 9.1875 13.125 6.5 13.9688C3.8125 13.125 1.84375 10.3438 1.84375 7.34375V4.1875L6.5 2.125L11.1562 4.1875V7.34375ZM3.4375 7.71875L2.5 8.65625L5.15625 11.3438L10.5 6L9.5625 5.0625L5.15625 9.4375L3.4375 7.71875Z"
                              fill="#17C666"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-medium">
                      Position *
                    </Label>
                    {isEditing ? (
                      <Select
                        value={profileData.position}
                        onValueChange={(value) =>
                          handleInputChange("position", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Executive Director">
                            Executive Director
                          </SelectItem>
                          <SelectItem value="Managing Director">
                            Managing Director
                          </SelectItem>
                          <SelectItem value="General Manager">
                            General Manager
                          </SelectItem>
                          <SelectItem value="Assistant Manager">
                            Assistant Manager
                          </SelectItem>
                          <SelectItem value="Team Lead">Team Lead</SelectItem>
                          <SelectItem value="Senior Developer">
                            Senior Developer
                          </SelectItem>
                          <SelectItem value="Developer">Developer</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-azure-24">
                          {profileData.position}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-azure-24">
                          {profileData.email}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-azure-24">
                          {profileData.phone}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-medium">
                      Department
                    </Label>
                    {isEditing ? (
                      <Select
                        value={profileData.department}
                        onValueChange={(value) =>
                          handleInputChange("department", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Executive Management">
                            Executive Management
                          </SelectItem>
                          <SelectItem value="Human Resources">
                            Human Resources
                          </SelectItem>
                          <SelectItem value="Information Technology">
                            Information Technology
                          </SelectItem>
                          <SelectItem value="Finance & Accounting">
                            Finance & Accounting
                          </SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Marketing & Sales">
                            Marketing & Sales
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-azure-24">
                          {profileData.department}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joinDate" className="text-sm font-medium">
                      Join Date
                    </Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-azure-24">
                        {new Date(profileData.joinDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-azure-24">
                        {profileData.address}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <div className="w-full border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: "profile", label: "Profile Details", icon: User },
              { id: "settings", label: "Settings", icon: Settings },
              { id: "activity", label: "Recent Activity", icon: Activity },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={cn(
                  "flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm",
                  activeTab === id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                      className="w-full"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {profileData.bio}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Employee ID</Label>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-azure-24 font-mono">
                        {profileData.employeeId}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Years of Service
                    </Label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-azure-24">
                        {new Date().getFullYear() -
                          new Date(profileData.joinDate).getFullYear()}{" "}
                        years
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <Label className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                        <p className="text-xs text-gray-500">
                          {key === "emailNotifications" &&
                            "Receive email notifications for important updates"}
                          {key === "pushNotifications" &&
                            "Get push notifications on your device"}
                          {key === "smsNotifications" &&
                            "Receive SMS alerts for critical events"}
                          {key === "taskReminders" &&
                            "Get reminded about upcoming tasks"}
                          {key === "meetingAlerts" &&
                            "Receive alerts for scheduled meetings"}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            [key]: checked,
                          }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-xs text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={security.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecurity((prev) => ({
                          ...prev,
                          twoFactorAuth: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">
                        Login Notifications
                      </Label>
                      <p className="text-xs text-gray-500">
                        Get notified when someone logs into your account
                      </p>
                    </div>
                    <Switch
                      checked={security.loginNotifications}
                      onCheckedChange={(checked) =>
                        setSecurity((prev) => ({
                          ...prev,
                          loginNotifications: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) =>
                        setSecurity((prev) => ({
                          ...prev,
                          sessionTimeout: e.target.value,
                        }))
                      }
                      className="w-32"
                      min="5"
                      max="120"
                    />
                  </div>

                  <Separator />

                  {/* Password Change Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Change Password</h3>

                    <div className="space-y-2">
                      <Label
                        htmlFor="currentPassword"
                        className="text-sm font-medium"
                      >
                        Current Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={security.currentPassword}
                          onChange={(e) =>
                            setSecurity((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                          className="w-full pr-10"
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
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

                    <div className="space-y-2">
                      <Label
                        htmlFor="newPassword"
                        className="text-sm font-medium"
                      >
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={security.newPassword}
                        onChange={(e) =>
                          setSecurity((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        className="w-full"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium"
                      >
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={security.confirmPassword}
                        onChange={(e) =>
                          setSecurity((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        className="w-full"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <Button
                      onClick={handlePasswordChange}
                      className="gap-2"
                      disabled={
                        !security.currentPassword ||
                        !security.newPassword ||
                        !security.confirmPassword
                      }
                    >
                      <Lock className="h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Language & Region */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Language & Region
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Language</Label>
                      <Select defaultValue="en-US">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="hi-IN">हिन्दी (Hindi)</SelectItem>
                          <SelectItem value="mr-IN">मराठी (Marathi)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Timezone</Label>
                      <Select defaultValue="Asia/Kolkata">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">
                            Asia/Kolkata (IST)
                          </SelectItem>
                          <SelectItem value="America/New_York">
                            America/New_York (EST)
                          </SelectItem>
                          <SelectItem value="Europe/London">
                            Europe/London (GMT)
                          </SelectItem>
                          <SelectItem value="Asia/Tokyo">
                            Asia/Tokyo (JST)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "activity" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
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
  );
};

export default Profile;

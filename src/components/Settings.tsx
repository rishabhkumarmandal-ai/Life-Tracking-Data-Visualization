
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { useToast } from '../hooks/use-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      dailyReminder: true,
      weeklyReport: false,
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC-8',
      dateFormat: 'MM/DD/YYYY',
    },
    privacy: {
      profilePublic: false,
      shareProgress: true,
      dataCollection: true,
    },
    dashboard: {
      autoRefresh: true,
      showAnimations: true,
      compactMode: false,
      defaultView: 'dashboard',
    }
  });

  const { toast } = useToast();

  const handleSwitchChange = (category: string, setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSelectChange = (category: string, setting: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleResetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to default values.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetSettings}>
            Reset to Default
          </Button>
          <Button onClick={handleSaveSettings}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={settings.notifications.email}
                onCheckedChange={(value) => handleSwitchChange('notifications', 'email', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={settings.notifications.push}
                onCheckedChange={(value) => handleSwitchChange('notifications', 'push', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-reminder">Daily Reminder</Label>
              <Switch
                id="daily-reminder"
                checked={settings.notifications.dailyReminder}
                onCheckedChange={(value) => handleSwitchChange('notifications', 'dailyReminder', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-report">Weekly Progress Report</Label>
              <Switch
                id="weekly-report"
                checked={settings.notifications.weeklyReport}
                onCheckedChange={(value) => handleSwitchChange('notifications', 'weeklyReport', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your dashboard experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={settings.preferences.theme} onValueChange={(value) => handleSelectChange('preferences', 'theme', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={settings.preferences.language} onValueChange={(value) => handleSelectChange('preferences', 'language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.preferences.timezone} onValueChange={(value) => handleSelectChange('preferences', 'timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                  <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
            <CardDescription>Control your privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-public">Make Profile Public</Label>
              <Switch
                id="profile-public"
                checked={settings.privacy.profilePublic}
                onCheckedChange={(value) => handleSwitchChange('privacy', 'profilePublic', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="share-progress">Share Progress with Friends</Label>
              <Switch
                id="share-progress"
                checked={settings.privacy.shareProgress}
                onCheckedChange={(value) => handleSwitchChange('privacy', 'shareProgress', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-collection">Allow Data Collection for Analytics</Label>
              <Switch
                id="data-collection"
                checked={settings.privacy.dataCollection}
                onCheckedChange={(value) => handleSwitchChange('privacy', 'dataCollection', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Customize your dashboard layout and behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-refresh">Auto-refresh Data</Label>
              <Switch
                id="auto-refresh"
                checked={settings.dashboard.autoRefresh}
                onCheckedChange={(value) => handleSwitchChange('dashboard', 'autoRefresh', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-animations">Show Animations</Label>
              <Switch
                id="show-animations"
                checked={settings.dashboard.showAnimations}
                onCheckedChange={(value) => handleSwitchChange('dashboard', 'showAnimations', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compact-mode">Compact Mode</Label>
              <Switch
                id="compact-mode"
                checked={settings.dashboard.compactMode}
                onCheckedChange={(value) => handleSwitchChange('dashboard', 'compactMode', value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Account Management */}
      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Download Data</Button>
            <Button variant="outline">Export Settings</Button>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

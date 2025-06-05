
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Edit, Save, X, Camera } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate about personal growth and productivity.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    joinDate: 'January 2024'
  });
  const [editedProfile, setEditedProfile] = useState(profile);
  const { toast } = useToast();

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Profile Settings</h2>
        {!isEditing ? (
          <Button onClick={handleEdit} className="flex items-center gap-2">
            <Edit size={16} />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save size={16} />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
              <X size={16} />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile photo</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-2xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="flex items-center gap-2">
              <Camera size={16} />
              Change Photo
            </Button>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{profile.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{profile.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={editedProfile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{profile.location}</p>
                )}
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                {isEditing ? (
                  <Input
                    id="website"
                    value={editedProfile.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{profile.website}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <textarea
                  id="bio"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md resize-none"
                  rows={3}
                  value={editedProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                />
              ) : (
                <p className="text-gray-700 mt-1">{profile.bio}</p>
              )}
            </div>
            <div>
              <Label>Member Since</Label>
              <p className="text-gray-700 mt-1">{profile.joinDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">42</div>
            <p className="text-sm text-gray-600">Days Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">15</div>
            <p className="text-sm text-gray-600">Goals Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <p className="text-sm text-gray-600">Habits Tracked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">95%</div>
            <p className="text-sm text-gray-600">Success Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

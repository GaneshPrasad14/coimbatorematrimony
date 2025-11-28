import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Edit, Trash2, Upload, LogOut, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../lib/api';

interface Profile {
  _id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  occupation: string;
  location: string;
  images: string[];
  description: string;
  dob?: string;
  contactNumber?: string;
  whatsappNumber?: string;
  salary?: string;
  company?: string;
  education?: string;
  address?: string;
  fatherName?: string;
  motherName?: string;
  interests?: string[];
  createdAt: string;
}

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    location: '',
    description: '',
    dob: '',
    contactNumber: '',
    whatsappNumber: '',
    salary: '',
    company: '',
    education: '',
    address: '',
    fatherName: '',
    motherName: '',
    interests: '',
    images: [] as File[]
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const fetchProfiles = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(api.buildUrl('/api/profiles'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfiles(data.data || []); // Extract the data array from the response
      } else if (response.status === 401) {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
    fetchProfiles();
  }, [checkAuth, fetchProfiles]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: files }));

    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          (value as File[]).forEach(file => {
            formDataToSend.append('images', file);
          });
        } else if (key === 'interests') {
          // Split interests by comma and trim whitespace
          const interestsArray = value.toString().split(',').map(interest => interest.trim()).filter(interest => interest);
          interestsArray.forEach(interest => {
            formDataToSend.append('interests', interest);
          });
        } else {
          formDataToSend.append(key, value.toString());
        }
      });

      const url = editingProfile ? `/api/profiles/${editingProfile._id}` : '/api/profiles';
      const method = editingProfile ? 'PUT' : 'POST';

      const response = await fetch(api.buildUrl(url), {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        fetchProfiles();
        resetForm();
        setShowForm(false);
      } else {
        console.error('Error saving profile');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setFormData({
      name: profile.name,
      age: profile.age.toString(),
      gender: profile.gender,
      occupation: profile.occupation,
      location: profile.location,
      description: profile.description,
      dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '',
      contactNumber: profile.contactNumber || '',
      whatsappNumber: profile.whatsappNumber || '',
      salary: profile.salary || '',
      company: profile.company || '',
      education: profile.education || '',
      address: profile.address || '',
      fatherName: profile.fatherName || '',
      motherName: profile.motherName || '',
      interests: profile.interests ? profile.interests.join(', ') : '',
      images: []
    });
    setImagePreviews(profile.images);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(api.buildUrl(`/api/profiles/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProfiles();
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      gender: '',
      occupation: '',
      location: '',
      description: '',
      dob: '',
      contactNumber: '',
      whatsappNumber: '',
      salary: '',
      company: '',
      education: '',
      address: '',
      fatherName: '',
      motherName: '',
      interests: '',
      images: []
    });
    setImagePreviews([]);
    setEditingProfile(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-luxury text-3xl font-bold mb-2">
                Admin <span className="text-gradient-gold">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">Manage groom and bride profiles</p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setShowForm(true)}
                className="gradient-gold text-foreground font-semibold shadow-gold hover:scale-105 transition-smooth"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Profile
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{profiles.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Grooms</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {profiles.filter(p => p.gender === 'male').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Brides</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {profiles.filter(p => p.gender === 'female').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingProfile ? 'Edit Profile' : 'Add New Profile'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactNumber">Contact Number</Label>
                      <Input
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                      <Input
                        id="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="salary">Salary</Label>
                      <Input
                        id="salary"
                        value={formData.salary}
                        onChange={(e) => handleInputChange('salary', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fatherName">Father's Name</Label>
                      <Input
                        id="fatherName"
                        value={formData.fatherName}
                        onChange={(e) => handleInputChange('fatherName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="motherName">Mother's Name</Label>
                      <Input
                        id="motherName"
                        value={formData.motherName}
                        onChange={(e) => handleInputChange('motherName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="interests">Interests (comma separated)</Label>
                      <Input
                        id="interests"
                        value={formData.interests}
                        onChange={(e) => handleInputChange('interests', e.target.value)}
                        placeholder="e.g., Reading, Music, Travel"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="images">Images</Label>
                      <Input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!editingProfile}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div>
                      <Label>Image Previews</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        {imagePreviews.map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Saving...' : (editingProfile ? 'Update Profile' : 'Add Profile')}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Profiles List */}
          <Card>
            <CardHeader>
              <CardTitle>All Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              {profiles.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No profiles found. Add your first profile above.
                </p>
              ) : (
                <div className="space-y-4">
                  {profiles.map((profile) => (
                    <div key={profile._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {profile.images.length > 0 && (
                          <img
                            src={profile.images[0]}
                            alt={profile.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">{profile.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {profile.age} years old • {profile.occupation} • {profile.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(profile)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(profile._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
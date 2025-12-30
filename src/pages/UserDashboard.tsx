import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Calendar, Mail, Building, Briefcase } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    company: profile?.company || '',
    position: profile?.position || '',
    phone: profile?.phone || '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Redirect waitlist users to waitlist dashboard
    if (profile?.role === 'waitlist') {
      navigate('/dashboard');
      return;
    }

    // Redirect admin users to admin dashboard
    if (profile?.role === 'admin') {
      navigate('/admin/dashboard');
      return;
    }

    // Update form data when profile loads
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        company: profile.company || '',
        position: profile.position || '',
        phone: profile.phone || '',
      });
    }
  }, [user, profile, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await updateProfile(formData);
      if (error) {
        setError(error.message || 'Failed to update profile');
      } else {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        company: profile.company || '',
        position: profile.position || '',
        phone: profile.phone || '',
      });
    }
    setIsEditing(false);
    setError(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olynk"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[48px] shadow-2xl p-8 lg:p-12 border border-beige mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black text-navy mb-2 uppercase tracking-tight">
                Dashboard
              </h1>
              <p className="text-steel font-medium">
                Welcome back, {profile.full_name || user.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-5 py-3 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-100 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-olynk/10 text-olynk rounded-full">
            <div className="w-2 h-2 bg-olynk rounded-full animate-pulse"></div>
            <span className="text-xs font-black uppercase tracking-widest">
              {profile.role === 'user' ? 'Active User' : profile.role}
            </span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[48px] shadow-2xl p-8 lg:p-12 border border-beige">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-navy uppercase tracking-tight">
              Profile Information
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2 bg-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-olynk transition-all"
              >
                <Settings className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
              <p className="text-red-600 text-xs font-black uppercase tracking-widest leading-relaxed">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
              <p className="text-emerald-600 text-xs font-black uppercase tracking-widest leading-relaxed">{success}</p>
            </div>
          )}

          {/* Profile Form */}
          <div className="space-y-6">
            {/* Email (read-only) */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1 flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Email Address
              </label>
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full px-5 py-3 rounded-2xl bg-cream/50 border-2 border-transparent font-medium text-navy/60 cursor-not-allowed"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="full_name" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1 flex items-center gap-2">
                <User className="w-3 h-3" />
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={formData.full_name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20 disabled:bg-cream/50 disabled:text-navy/60 disabled:cursor-not-allowed"
                placeholder="Enter your full name"
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label htmlFor="company" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1 flex items-center gap-2">
                <Building className="w-3 h-3" />
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20 disabled:bg-cream/50 disabled:text-navy/60 disabled:cursor-not-allowed"
                placeholder="Enter your company name"
              />
            </div>

            {/* Position */}
            <div className="space-y-2">
              <label htmlFor="position" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1 flex items-center gap-2">
                <Briefcase className="w-3 h-3" />
                Position
              </label>
              <input
                id="position"
                name="position"
                type="text"
                value={formData.position}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20 disabled:bg-cream/50 disabled:text-navy/60 disabled:cursor-not-allowed"
                placeholder="Enter your position"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1 flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20 disabled:bg-cream/50 disabled:text-navy/60 disabled:cursor-not-allowed"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="flex-1 py-4 px-4 bg-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-olynk transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-6 py-4 bg-cream text-navy rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-beige transition-all border-2 border-beige disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[48px] shadow-2xl p-8 lg:p-12 border border-beige mt-8">
          <h2 className="text-2xl font-black text-navy uppercase tracking-tight mb-6">
            Account Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-beige">
              <span className="text-xs font-black text-tan uppercase tracking-widest">Account Created</span>
              <span className="text-sm font-bold text-navy">
                {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            {profile.last_login && (
              <div className="flex items-center justify-between py-3 border-b border-beige">
                <span className="text-xs font-black text-tan uppercase tracking-widest">Last Login</span>
                <span className="text-sm font-bold text-navy">
                  {new Date(profile.last_login).toLocaleDateString()}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between py-3">
              <span className="text-xs font-black text-tan uppercase tracking-widest">Account Status</span>
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                profile.is_active 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'bg-red-50 text-red-600'
              }`}>
                {profile.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

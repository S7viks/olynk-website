import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  mode?: 'login' | 'signup' | 'waitlist';
  onSuccess?: () => void;
  onCancel?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  mode = 'login', 
  onSuccess, 
  onCancel 
}) => {
  const { signIn, signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    company: '',
    position: '',
    phone: ''
  });
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (mode === 'signup' || mode === 'waitlist') {
      if (!formData.fullName) {
        setError('Full name is required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'login') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          setError(error.message || 'Login failed');
        } else {
          setSuccess('Login successful!');
          setTimeout(() => {
            onSuccess?.();
            navigate('/');
          }, 1000);
        }
      } else if (mode === 'signup' || mode === 'waitlist') {
        const signupData = {
          email: formData.email,
          password: formData.password,
          full_name: formData.fullName,
          company: formData.company || undefined,
          position: formData.position || undefined,
          phone: formData.phone || undefined,
        };

        const { error } = await signUp(signupData);
        if (error) {
          setError(error.message || 'Signup failed');
        } else {
          setSuccess(mode === 'waitlist' 
            ? 'Successfully joined the waitlist! Check your email to confirm your account.' 
            : 'Account created successfully! Check your email to confirm your account.'
          );
          setTimeout(() => {
            onSuccess?.();
            navigate('/');
          }, 2000);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'signup': return 'Create Account';
      case 'waitlist': return 'Join Waitlist';
      default: return 'Login';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'signup': return 'Create your Olynk account';
      case 'waitlist': return 'Join the exclusive waitlist for early access';
      default: return 'Welcome back to Olynk';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[150px] font-black font-mono text-navy tracking-tighter uppercase whitespace-nowrap">AUTHENTICATION</span>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-[48px] shadow-2xl p-10 lg:p-12 border border-beige">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-black text-navy tracking-tightest">O</span>
            </div>
            <h2 className="text-3xl font-black text-navy mb-2 uppercase tracking-tight">
              {getTitle()}
            </h2>
            <p className="text-steel font-medium">
              {getSubtitle()}
            </p>
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20"
                placeholder="Enter your email"
              />
            </div>

            {/* Full Name (for signup/waitlist) */}
            {(mode === 'signup' || mode === 'waitlist') && (
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {/* Company (optional for signup/waitlist) */}
            {(mode === 'signup' || mode === 'waitlist') && (
              <div className="space-y-2">
                <label htmlFor="company" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">
                  Company (Optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20"
                  placeholder="Enter your company name"
                />
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password (for signup/waitlist) */}
            {(mode === 'signup' || mode === 'waitlist') && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full flex justify-center py-4 px-4 bg-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-olynk transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {mode === 'login' ? 'Authorizing...' : 'Provisioning...'}
                </div>
              ) : (
                getTitle()
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            {mode === 'login' ? (
              <>
                <p className="text-xs font-bold text-steel">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/signup')}
                    className="text-olynk hover:text-navy transition-colors underline underline-offset-4"
                  >
                    Sign up
                  </button>
                </p>
                <p className="text-[10px] font-black text-tan uppercase tracking-widest">
                  Want early access?{' '}
                  <button
                    onClick={() => navigate('/waitlist')}
                    className="text-navy hover:text-olynk transition-colors"
                  >
                    Join waitlist
                  </button>
                </p>
              </>
            ) : (
              <p className="text-xs font-bold text-steel">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-olynk hover:text-navy transition-colors underline underline-offset-4"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
          <p className="text-[9px] text-tan uppercase tracking-[0.3em] font-mono pt-8 text-center opacity-40">// SYSTEM_STATUS: ENCRYPTED</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 
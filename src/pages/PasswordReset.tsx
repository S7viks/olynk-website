import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabase';

const PasswordReset: React.FC = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [mode, setMode] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if we have a token in the URL (password reset confirmation)
    const accessToken = searchParams.get('access_token');
    const type = searchParams.get('type');
    
    if (accessToken && type === 'recovery') {
      setMode('reset');
    }
  }, [searchParams]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Email is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        setError(error.message || 'Failed to send reset email');
      } else {
        setSuccess('Password reset email sent! Check your inbox.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newPassword || !confirmPassword) {
      setError('Both password fields are required');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        setError(error.message || 'Failed to reset password');
      } else {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[150px] font-black font-mono text-navy tracking-tighter uppercase whitespace-nowrap">
          {mode === 'request' ? 'RESET' : 'NEW PASSWORD'}
        </span>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-[48px] shadow-2xl p-10 lg:p-12 border border-beige">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-black text-navy tracking-tightest">O</span>
            </div>
            <h2 className="text-3xl font-black text-navy mb-2 uppercase tracking-tight">
              {mode === 'request' ? 'Reset Password' : 'Set New Password'}
            </h2>
            <p className="text-steel font-medium">
              {mode === 'request' 
                ? 'Enter your email to receive a password reset link'
                : 'Enter your new password below'
              }
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
          {mode === 'request' ? (
            <form onSubmit={handleRequestReset} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 bg-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-olynk transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20"
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/20"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 bg-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-olynk transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Resetting...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          )}

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-bold text-steel hover:text-olynk transition-colors underline underline-offset-4"
            >
              Back to Login
            </button>
          </div>
          <p className="text-[9px] text-tan uppercase tracking-[0.3em] font-mono pt-8 text-center opacity-40">// SYSTEM_STATUS: ENCRYPTED</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;

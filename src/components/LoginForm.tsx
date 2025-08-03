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
            navigate('/dashboard');
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
            if (mode === 'waitlist') {
              navigate('/waitlist');
            } else {
              navigate('/dashboard');
            }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {getTitle()}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {getSubtitle()}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
              <p className="text-green-800 dark:text-green-200 text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Full Name (for signup/waitlist) */}
            {(mode === 'signup' || mode === 'waitlist') && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {/* Company (optional for signup/waitlist) */}
            {(mode === 'signup' || mode === 'waitlist') && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company (Optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your company name"
                />
              </div>
            )}

            {/* Position (optional for signup/waitlist) */}
            {(mode === 'signup' || mode === 'waitlist') && (
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position (Optional)
                </label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your position"
                />
              </div>
            )}

            {/* Phone (optional for signup/waitlist) */}
            {(mode === 'signup' || mode === 'waitlist') && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone (Optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your phone number"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password (for signup/waitlist) */}
            {(mode === 'signup' || mode === 'waitlist') && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                getTitle()
              )}
            </button>

            {/* Cancel Button */}
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Cancel
              </button>
            )}
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            {mode === 'login' ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/signup')}
                    className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Sign up
                  </button>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Want early access?{' '}
                  <button
                    onClick={() => navigate('/waitlist')}
                    className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Join waitlist
                  </button>
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 
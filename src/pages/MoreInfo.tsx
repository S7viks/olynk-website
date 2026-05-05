import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Phone, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

type MoreInfoForm = {
  full_name: string;
  company: string;
  position: string;
  phone: string;
};

const MoreInfo = () => {
  const { user, profile, isLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const initial = useMemo<MoreInfoForm>(() => {
    return {
      full_name: profile?.full_name || '',
      company: profile?.company || '',
      position: profile?.position || '',
      phone: profile?.phone || '',
    };
  }, [profile]);

  const missing = useMemo(() => {
    const isMissing = (v: string | undefined | null) => !v || v.trim().length === 0;
    return {
      full_name: isMissing(profile?.full_name),
      company: isMissing(profile?.company),
      position: isMissing(profile?.position),
      phone: isMissing(profile?.phone),
    };
  }, [profile]);

  const anyMissing = missing.full_name || missing.company || missing.position || missing.phone;

  const [form, setForm] = useState<MoreInfoForm>(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login', { replace: true });
      return;
    }
  }, [isLoading, user, navigate]);

  useEffect(() => {
    if (!isLoading && user) {
      authService.ensureWaitlistOnAuth().catch((e) => {
        console.error('Failed to ensure waitlist membership:', e);
      });
    }
  }, [isLoading, user]);

  const onChange = (key: keyof MoreInfoForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setError(null);
    setSuccess(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (anyMissing) {
        const profilePatch: Record<string, string | undefined> = {};
        if (missing.full_name) profilePatch.full_name = form.full_name || undefined;
        if (missing.company) profilePatch.company = form.company || undefined;
        if (missing.position) profilePatch.position = form.position || undefined;
        if (missing.phone) profilePatch.phone = form.phone || undefined;

        const { error: profileError } = await authService.updateUserProfile(profilePatch);
        if (profileError) throw profileError;
      }

      const { tenantId, error: tenantError } = await authService.ensureTenantForCurrentUser();
      if (tenantError) throw tenantError;
      if (!tenantId) throw new Error('Failed to initialize workspace');

      const answers = {
        full_name: missing.full_name ? (form.full_name || null) : (profile?.full_name || null),
        company: missing.company ? (form.company || null) : (profile?.company || null),
        position: missing.position ? (form.position || null) : (profile?.position || null),
        phone: missing.phone ? (form.phone || null) : (profile?.phone || null),
      };

      const { error: onboardingError } = await authService.upsertTenantOnboarding({
        tenantId,
        answers,
        pilotRouting: {
          source: 'more-info',
          completed_at: new Date().toISOString(),
        },
      });
      if (onboardingError) throw onboardingError;

      await authService.ensureWaitlistOnAuth({
        referral_source: 'auth',
        additional_notes: 'Completed more-info form',
      });

      await refreshProfile();
      setSuccess('Saved. Redirecting to your waitlist dashboard…');
      setTimeout(() => navigate('/dashboard', { replace: true }), 800);
    } catch (err: any) {
      setError(err?.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olynk"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl p-10 border border-beige">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-6 shadow-sm">
                <User className="w-3 h-3 text-navy" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">MORE_INFO</span>
              </div>
              <h1 className="page-hero-title mb-3">One more step.</h1>
              <p className="text-steel font-medium">
                Tell us a bit about you. We’ll use this to prioritize onboarding and route you to the right pilot.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                <p className="text-red-600 text-xs font-black uppercase tracking-widest leading-relaxed">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <p className="text-emerald-700 text-xs font-black uppercase tracking-widest leading-relaxed">{success}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              {!anyMissing ? (
                <div className="rounded-2xl border border-beige bg-cream/40 p-5">
                  <p className="text-[10px] font-black text-tan uppercase tracking-widest mb-2">Already on file</p>
                  <div className="space-y-2 text-sm text-navy">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold">Full name</span>
                      <span className="font-medium text-navy/70">{profile?.full_name || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold">Company</span>
                      <span className="font-medium text-navy/70">{profile?.company || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold">Role / title</span>
                      <span className="font-medium text-navy/70">{profile?.position || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold">Phone</span>
                      <span className="font-medium text-navy/70">{profile?.phone || '—'}</span>
                    </div>
                  </div>
                </div>
              ) : null}

              {missing.full_name ? (
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">Full name</label>
                  <div className="flex items-center gap-3 bg-cream rounded-2xl px-5 py-3 border-2 border-transparent focus-within:border-olynk transition-all">
                    <User className="w-4 h-4 text-navy/50" />
                    <input
                      value={form.full_name}
                      onChange={onChange('full_name')}
                      className="w-full bg-transparent outline-none font-medium text-navy placeholder:text-navy/20"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                </div>
              ) : null}

              {missing.company ? (
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">Company</label>
                  <div className="flex items-center gap-3 bg-cream rounded-2xl px-5 py-3 border-2 border-transparent focus-within:border-olynk transition-all">
                    <Building2 className="w-4 h-4 text-navy/50" />
                    <input
                      value={form.company}
                      onChange={onChange('company')}
                      className="w-full bg-transparent outline-none font-medium text-navy placeholder:text-navy/20"
                      placeholder="Company name"
                    />
                  </div>
                </div>
              ) : null}

              {missing.position ? (
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">Role / title</label>
                  <div className="flex items-center gap-3 bg-cream rounded-2xl px-5 py-3 border-2 border-transparent focus-within:border-olynk transition-all">
                    <Briefcase className="w-4 h-4 text-navy/50" />
                    <input
                      value={form.position}
                      onChange={onChange('position')}
                      className="w-full bg-transparent outline-none font-medium text-navy placeholder:text-navy/20"
                      placeholder="Founder, VP Ops, Supply Chain Lead…"
                    />
                  </div>
                </div>
              ) : null}

              {missing.phone ? (
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-tan uppercase tracking-widest ml-1">Phone</label>
                  <div className="flex items-center gap-3 bg-cream rounded-2xl px-5 py-3 border-2 border-transparent focus-within:border-olynk transition-all">
                    <Phone className="w-4 h-4 text-navy/50" />
                    <input
                      value={form.phone}
                      onChange={onChange('phone')}
                      className="w-full bg-transparent outline-none font-medium text-navy placeholder:text-navy/20"
                      placeholder="+91…"
                    />
                  </div>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={saving}
                className="w-full flex justify-center py-4 px-4 bg-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-olynk transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {saving ? 'Saving…' : 'Continue'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoreInfo;


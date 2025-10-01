"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Setting {
  id: string;
  key: string;
  value: any;
  description?: string;
  updatedAt: string;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savingToggle, setSavingToggle] = useState<string | null>(null);
  const [editedSettings, setEditedSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && session.user.role !== 'ADMIN') {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/dashboard/admin/settings');
        if (response.ok) {
          const data = await response.json();
          console.log('Loaded settings from database:', data); // Debug log
          setSettings(data);
          // Initialize edited settings
          const initial: Record<string, any> = {};
          data.forEach((setting: Setting) => {
            initial[setting.key] = setting.value;
          });
          console.log('Initialized settings state:', initial); // Debug log
          setEditedSettings(initial);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.role === 'ADMIN') {
      fetchSettings();
    }
  }, [session]);

  const handleSettingChange = async (key: string, value: any) => {
    // Update local state immediately for UI responsiveness
    setEditedSettings({
      ...editedSettings,
      [key]: value,
    });

    // Save to database immediately for toggles
    if (key === 'enable_newsletter' || key === 'enable_blog' || key === 'maintenance_mode') {
      setSavingToggle(key);
      try {
        const response = await fetch('/api/dashboard/admin/settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...editedSettings,
            [key]: value, // Use the new value
          }),
        });

        if (response.ok) {
          const updatedSettings = await response.json();
          console.log(`Toggle ${key} saved:`, value);

          // Update both states to ensure sync
          setSettings(updatedSettings);
          const updated: Record<string, any> = {};
          updatedSettings.forEach((setting: Setting) => {
            updated[setting.key] = setting.value;
          });
          setEditedSettings(updated);

          // Show success briefly
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 2000);
        } else {
          // Revert on failure
          console.error('Failed to save toggle');
          setEditedSettings({
            ...editedSettings,
          });
        }
      } catch (error) {
        console.error('Error saving toggle:', error);
        // Revert on error
        setEditedSettings({
          ...editedSettings,
        });
      } finally {
        setSavingToggle(null);
      }
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      console.log('Saving settings:', editedSettings); // Debug log

      const response = await fetch('/api/dashboard/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedSettings),
      });

      if (response.ok) {
        const updatedSettings = await response.json();
        console.log('Settings saved successfully:', updatedSettings); // Debug log
        setSettings(updatedSettings);

        // Update editedSettings with the saved values to ensure sync
        const updated: Record<string, any> = {};
        updatedSettings.forEach((setting: Setting) => {
          updated[setting.key] = setting.value;
        });
        setEditedSettings(updated);

        // Show success message
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        console.error('Failed to save settings:', await response.text());
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121417' }}>
      {/* Header */}
      <header className="p-6 border-b" style={{ borderColor: 'rgba(195, 163, 85, 0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm mb-2 hover:opacity-80 transition-opacity"
                style={{ color: '#8A94A6' }}
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-light tracking-wider" style={{ color: '#E8ECEF' }}>
                System Settings
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Configure system-wide settings and preferences
              </p>
            </div>

            <div className="flex items-center gap-4">
              {saveSuccess && (
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="text-sm font-light"
                  style={{ color: '#4A8E55' }}
                >
                  ✓ Settings saved successfully!
                </motion.p>
              )}
              <button
                onClick={saveSettings}
                disabled={saving}
                className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)',
                  color: '#121417',
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Sections */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(195, 163, 85, 0.2)',
            }}
          >
            <h2 className="text-xl font-light tracking-wider mb-6" style={{ color: '#C3A355' }}>
              General Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Site Name
                </label>
                <input
                  type="text"
                  value={editedSettings.site_name || ''}
                  onChange={(e) => handleSettingChange('site_name', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
                <p className="text-xs mt-1" style={{ color: '#8A94A6' }}>
                  The name of your website
                </p>
              </div>

              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Site Description
                </label>
                <textarea
                  value={editedSettings.site_description || ''}
                  onChange={(e) => handleSettingChange('site_description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
                <p className="text-xs mt-1" style={{ color: '#8A94A6' }}>
                  Main description of your website
                </p>
              </div>

              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  value={editedSettings.contact_email || ''}
                  onChange={(e) => handleSettingChange('contact_email', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
                <p className="text-xs mt-1" style={{ color: '#8A94A6' }}>
                  Primary contact email address
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Media Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(74, 142, 85, 0.2)',
            }}
          >
            <h2 className="text-xl font-light tracking-wider mb-6" style={{ color: '#4A8E55' }}>
              Social Media Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={editedSettings.social_links?.linkedin || ''}
                  onChange={(e) => handleSettingChange('social_links', {
                    ...editedSettings.social_links,
                    linkedin: e.target.value,
                  })}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(74, 142, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Instagram
                </label>
                <input
                  type="url"
                  value={editedSettings.social_links?.instagram || ''}
                  onChange={(e) => handleSettingChange('social_links', {
                    ...editedSettings.social_links,
                    instagram: e.target.value,
                  })}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(74, 142, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Behance
                </label>
                <input
                  type="url"
                  value={editedSettings.social_links?.behance || ''}
                  onChange={(e) => handleSettingChange('social_links', {
                    ...editedSettings.social_links,
                    behance: e.target.value,
                  })}
                  placeholder="https://behance.net/..."
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(74, 142, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  X (Twitter)
                </label>
                <input
                  type="url"
                  value={editedSettings.social_links?.twitter || ''}
                  onChange={(e) => handleSettingChange('social_links', {
                    ...editedSettings.social_links,
                    twitter: e.target.value,
                  })}
                  placeholder="https://x.com/..."
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(74, 142, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Features Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(34, 211, 238, 0.2)',
            }}
          >
            <h2 className="text-xl font-light tracking-wider mb-6" style={{ color: '#22D3EE' }}>
              Feature Toggles
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-black/20 transition-colors">
                <div>
                  <span className="block text-sm font-light" style={{ color: '#E8ECEF' }}>
                    Enable Newsletter Signups
                  </span>
                  <span className="text-xs" style={{ color: '#8A94A6' }}>
                    Allow visitors to subscribe to your newsletter
                  </span>
                </div>
                <button
                  onClick={() => handleSettingChange('enable_newsletter', !editedSettings.enable_newsletter)}
                  disabled={savingToggle === 'enable_newsletter'}
                  className="relative w-14 h-7 rounded-full transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: editedSettings.enable_newsletter
                      ? 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)'
                      : 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                  }}
                >
                  {savingToggle === 'enable_newsletter' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <motion.div
                      className="absolute top-0.5 w-6 h-6 rounded-full"
                      style={{
                        background: editedSettings.enable_newsletter ? '#121417' : '#8A94A6',
                      }}
                      animate={{ left: editedSettings.enable_newsletter ? '1.75rem' : '0.125rem' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-black/20 transition-colors">
                <div>
                  <span className="block text-sm font-light" style={{ color: '#E8ECEF' }}>
                    Enable Blog
                  </span>
                  <span className="text-xs" style={{ color: '#8A94A6' }}>
                    Display blog articles on the website
                  </span>
                </div>
                <button
                  onClick={() => handleSettingChange('enable_blog', !editedSettings.enable_blog)}
                  disabled={savingToggle === 'enable_blog'}
                  className="relative w-14 h-7 rounded-full transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: editedSettings.enable_blog
                      ? 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)'
                      : 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                  }}
                >
                  {savingToggle === 'enable_blog' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <motion.div
                      className="absolute top-0.5 w-6 h-6 rounded-full"
                      style={{
                        background: editedSettings.enable_blog ? '#121417' : '#8A94A6',
                      }}
                      animate={{ left: editedSettings.enable_blog ? '1.75rem' : '0.125rem' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-black/20 transition-colors">
                <div>
                  <span className="block text-sm font-light" style={{ color: '#E8ECEF' }}>
                    Maintenance Mode
                  </span>
                  <span className="text-xs" style={{ color: '#8A94A6' }}>
                    Show maintenance page to visitors
                  </span>
                </div>
                <button
                  onClick={() => handleSettingChange('maintenance_mode', !editedSettings.maintenance_mode)}
                  disabled={savingToggle === 'maintenance_mode'}
                  className="relative w-14 h-7 rounded-full transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: editedSettings.maintenance_mode
                      ? 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)'
                      : 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                  }}
                >
                  {savingToggle === 'maintenance_mode' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <motion.div
                      className="absolute top-0.5 w-6 h-6 rounded-full"
                      style={{
                        background: editedSettings.maintenance_mode ? '#121417' : '#8A94A6',
                      }}
                      animate={{ left: editedSettings.maintenance_mode ? '1.75rem' : '0.125rem' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Last Updated Info */}
          {settings.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center py-4"
            >
              <p className="text-sm" style={{ color: '#8A94A6' }}>
                Last updated: {new Date(settings[0].updatedAt).toLocaleString()}
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
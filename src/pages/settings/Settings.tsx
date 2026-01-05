import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import logo from '../../assets/images/logo.png';

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
  };
  preferences: {
    language: string;
    currency: string;
    theme: 'light' | 'dark' | 'auto';
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: false,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    },
    preferences: {
      language: 'English',
      currency: 'USD',
      theme: 'light'
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleToggleChange = (section: keyof UserSettings, field: string) => {
    if (section === 'notifications') {
      setSettings(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [field]: !prev.notifications[field as keyof typeof prev.notifications]
        }
      }));
    } else if (section === 'privacy') {
      if (field === 'showEmail' || field === 'showPhone') {
        setSettings(prev => ({
          ...prev,
          privacy: {
            ...prev.privacy,
            [field]: !prev.privacy[field as keyof typeof prev.privacy]
          }
        }));
      }
    }
    setHasChanges(true);
  };

  const handleSelectChange = (section: keyof UserSettings, field: string, value: string) => {
    if (section === 'privacy' && field === 'profileVisibility') {
      setSettings(prev => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          profileVisibility: value as 'public' | 'private' | 'friends'
        }
      }));
    } else if (section === 'preferences') {
      if (field === 'theme') {
        setSettings(prev => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            theme: value as 'light' | 'dark' | 'auto'
          }
        }));
      } else {
        setSettings(prev => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            [field]: value
          }
        }));
      }
    }
    setHasChanges(true);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };

  const handleReset = () => {
    // Reset to default values
    setSettings({
      notifications: {
        email: true,
        push: false,
        marketing: false
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false
      },
      preferences: {
        language: 'English',
        currency: 'USD',
        theme: 'light'
      }
    });
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-8">
        <img src={logo} alt="VR Logo" className="w-8 h-8 mr-2" />
        <span className="text-xl font-bold text-white" style={{ fontFamily: 'Beatrice, serif' }}>VR</span>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Beatrice, serif' }}>Settings</h1>
          <p className="text-gray-400">Manage your account preferences and privacy settings</p>
        </div>

        {/* Notifications Section */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Beatrice, serif' }}>Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Email Notifications</label>
                <p className="text-gray-400 text-sm">Receive updates via email</p>
              </div>
              <button
                onClick={() => handleToggleChange('notifications', 'email')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.email ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Push Notifications</label>
                <p className="text-gray-400 text-sm">Receive push notifications on your device</p>
              </div>
              <button
                onClick={() => handleToggleChange('notifications', 'push')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.push ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Marketing Communications</label>
                <p className="text-gray-400 text-sm">Receive promotional emails and offers</p>
              </div>
              <button
                onClick={() => handleToggleChange('notifications', 'marketing')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.marketing ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Beatrice, serif' }}>Privacy</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-white font-medium block mb-2">Profile Visibility</label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => handleSelectChange('privacy', 'profileVisibility', e.target.value)}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Show Email Address</label>
                <p className="text-gray-400 text-sm">Display your email on your public profile</p>
              </div>
              <button
                onClick={() => handleToggleChange('privacy', 'showEmail')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.privacy.showEmail ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Show Phone Number</label>
                <p className="text-gray-400 text-sm">Display your phone number on your public profile</p>
              </div>
              <button
                onClick={() => handleToggleChange('privacy', 'showPhone')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.privacy.showPhone ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacy.showPhone ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Beatrice, serif' }}>Preferences</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-white font-medium block mb-2">Language</label>
              <select
                value={settings.preferences.language}
                onChange={(e) => handleSelectChange('preferences', 'language', e.target.value)}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
              </select>
            </div>

            <div>
              <label className="text-white font-medium block mb-2">Currency</label>
              <select
                value={settings.preferences.currency}
                onChange={(e) => handleSelectChange('preferences', 'currency', e.target.value)}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <div>
              <label className="text-white font-medium block mb-2">Theme</label>
              <select
                value={settings.preferences.theme}
                onChange={(e) => handleSelectChange('preferences', 'theme', e.target.value)}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {hasChanges && (
          <div className="flex gap-4 justify-center">
            <Button
              text="Save Changes"
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            />
            <Button
              text="Reset to Default"
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
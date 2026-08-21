import { useState } from 'react';
import { User, Shield, Palette, Bell, Briefcase, Mail, FileText, Eye, Upload, Check, X } from 'lucide-react';

type SettingsSection = 'my-account' | 'platform-profile';
type AccountScreen = 'profile' | 'security' | 'appearance' | 'notifications';
type PlatformScreen = 'branding' | 'contact' | 'metadata' | 'defaults';

export function SuperAdminSettings() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('my-account');
  const [activeAccountScreen, setActiveAccountScreen] = useState<AccountScreen>('profile');
  const [activePlatformScreen, setActivePlatformScreen] = useState<PlatformScreen>('branding');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  // State for My Account - Profile
  const [fullName, setFullName] = useState('Sarah Chen');
  const [email] = useState('sarah.chen@optimile.com');
  const [role] = useState('Super Admin');
  const [accountStatus] = useState('Active');
  const [lastLogin] = useState('2026-01-06 14:30:00 UTC');

  // State for My Account - Security
  const [mfaEnabled, setMfaEnabled] = useState(true);

  // State for My Account - Appearance
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [language, setLanguage] = useState('en-US');

  // State for My Account - Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [severityPreference, setSeverityPreference] = useState<'critical' | 'all'>('all');

  // State for Platform Profile - Branding
  const [platformName, setPlatformName] = useState('OptiMile');

  // State for Platform Profile - Contact
  const [supportEmail, setSupportEmail] = useState('support@optimile.com');
  const [supportPhone, setSupportPhone] = useState('+1 (555) 123-4567');
  const [systemSenderName, setSystemSenderName] = useState('OptiMile Platform');

  // State for Platform Profile - Metadata
  const [platformDescription, setPlatformDescription] = useState('Enterprise last-mile execution control platform');
  const [websiteUrl, setWebsiteUrl] = useState('https://optimile.com');
  const [legalName] = useState('OptiMile Technologies Inc.');

  // State for Platform Profile - Defaults
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark'>('light');
  const [defaultLanguage, setDefaultLanguage] = useState('en-US');

  const handleSave = (message: string) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 sm:px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm">Personal account and platform configuration</p>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left Sidebar Navigation */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                
                {/* My Account Section */}
                <div className="border-b border-border">
                  <button
                    onClick={() => setActiveSection('my-account')}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      activeSection === 'my-account'
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">My Account</span>
                    </div>
                  </button>
                  
                  {activeSection === 'my-account' && (
                    <div className="bg-muted">
                      <button
                        onClick={() => setActiveAccountScreen('profile')}
                        className={`w-full px-4 py-2 pl-10 text-left text-sm transition-colors ${
                          activeAccountScreen === 'profile'
                            ? 'text-foreground bg-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => setActiveAccountScreen('security')}
                        className={`w-full px-4 py-2 pl-10 text-left text-sm transition-colors ${
                          activeAccountScreen === 'security'
                            ? 'text-foreground bg-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        Security
                      </button>
                      <button
                        onClick={() => setActiveAccountScreen('appearance')}
                        className={`w-full px-4 py-2 pl-10 text-left text-sm transition-colors ${
                          activeAccountScreen === 'appearance'
                            ? 'text-foreground bg-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        Appearance
                      </button>
                      <button
                        onClick={() => setActiveAccountScreen('notifications')}
                        className={`w-full px-4 py-2 pl-10 text-left text-sm transition-colors ${
                          activeAccountScreen === 'notifications'
                            ? 'text-foreground bg-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        Notifications
                      </button>
                    </div>
                  )}
                </div>

                {/* Platform Profile Section */}
                <div>
                  <button
                    onClick={() => setActiveSection('platform-profile')}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      activeSection === 'platform-profile'
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">Platform Profile</span>
                    </div>
                  </button>
                  
                  {activeSection === 'platform-profile' && (
                    <div className="bg-muted">
                      <button
                        onClick={() => setActivePlatformScreen('branding')}
                        className={`w-full px-4 py-2 pl-10 text-left text-sm transition-colors ${
                          activePlatformScreen === 'branding'
                            ? 'text-foreground bg-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        Platform Branding
                      </button>
                      <button
                        onClick={() => setActivePlatformScreen('contact')}
                        className={`w-full px-4 py-2 pl-10 text-left text-sm transition-colors ${
                          activePlatformScreen === 'contact'
                            ? 'text-foreground bg-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        Contact Identity
                      </button>
                      <button
                        onClick={() => setActivePlatformScreen('metadata')}
                        className={`w-full px-4 py-2 pl-10 text-left text-sm transition-colors ${
                          activePlatformScreen === 'metadata'
                            ? 'text-foreground bg-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        Platform Metadata
                      </button>
                      <button
                        onClick={() => setActivePlatformScreen('defaults')}
                        className={`w-full px-4 py-2 pl-10 text-left text-sm transition-colors ${
                          activePlatformScreen === 'defaults'
                            ? 'text-foreground bg-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        Visual Defaults
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              
              {/* MY ACCOUNT SCREENS */}
              {activeSection === 'my-account' && activeAccountScreen === 'profile' && (
                <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                  <div className="mb-6">
                    <h2 className="text-foreground mb-1">Profile</h2>
                    <p className="text-muted-foreground text-sm">Manage your personal identity information</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                      />
                      <p className="text-muted-foreground text-xs mt-1">Contact support to change email address</p>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Role</label>
                      <input
                        type="text"
                        value={role}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-foreground mb-2">Account Status</label>
                        <div className="px-3 py-2 border border-border rounded-lg bg-muted">
                          <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                            {accountStatus}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-foreground mb-2">Last Login</label>
                        <div className="px-3 py-2 border border-border rounded-lg bg-muted">
                          <p className="text-foreground text-sm">{lastLogin}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <button
                        onClick={() => handleSave('Profile updated successfully')}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'my-account' && activeAccountScreen === 'security' && (
                <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                  <div className="mb-6">
                    <h2 className="text-foreground mb-1">Security</h2>
                    <p className="text-muted-foreground text-sm">Manage your personal security and access</p>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-foreground mb-1">Password</h3>
                          <p className="text-muted-foreground text-sm">Change your account password</p>
                        </div>
                        <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">
                          Change Password
                        </button>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-foreground mb-1">Multi-Factor Authentication (MFA)</h3>
                          <p className="text-muted-foreground text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <button
                          onClick={() => {
                            setMfaEnabled(!mfaEnabled);
                            handleSave(mfaEnabled ? 'MFA disabled' : 'MFA enabled');
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            mfaEnabled ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              mfaEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      {mfaEnabled && (
                        <div className="pt-3 border-t border-border">
                          <p className="text-green-700 text-sm">✓ MFA is currently enabled</p>
                        </div>
                      )}
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-foreground mb-1">Active Sessions</h3>
                          <p className="text-muted-foreground text-sm">View and manage your active sessions</p>
                        </div>
                        <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">
                          View Sessions
                        </button>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-foreground mb-1">Logout from Other Sessions</h3>
                          <p className="text-muted-foreground text-sm">End all other active sessions</p>
                        </div>
                        <button className="px-4 py-2 border border-red-200 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm">
                          Logout Other Sessions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'my-account' && activeAccountScreen === 'appearance' && (
                <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                  <div className="mb-6">
                    <h2 className="text-foreground mb-1">Appearance</h2>
                    <p className="text-muted-foreground text-sm">Customize your personal UI experience</p>
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-900 text-sm">
                        <strong>Note:</strong> These settings apply only to your Super Admin interface and do not affect tenant UI.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-foreground mb-3">Theme</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          onClick={() => setTheme('light')}
                          className={`p-4 border rounded-lg transition-all ${
                            theme === 'light'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                              : 'border-border hover:border-blue-300'
                          }`}
                        >
                          <div className="w-full h-12 bg-white border border-border rounded mb-2" />
                          <p className="text-foreground text-sm text-center">Light</p>
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`p-4 border rounded-lg transition-all ${
                            theme === 'dark'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                              : 'border-border hover:border-blue-300'
                          }`}
                        >
                          <div className="w-full h-12 bg-slate-800 border border-slate-700 rounded mb-2" />
                          <p className="text-foreground text-sm text-center">Dark</p>
                        </button>
                        <button
                          onClick={() => setTheme('system')}
                          className={`p-4 border rounded-lg transition-all ${
                            theme === 'system'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                              : 'border-border hover:border-blue-300'
                          }`}
                        >
                          <div className="w-full h-12 bg-gradient-to-r from-white to-slate-800 border border-border rounded mb-2" />
                          <p className="text-foreground text-sm text-center">System</p>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-3">UI Density</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={() => setDensity('comfortable')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            density === 'comfortable'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                              : 'border-border hover:border-blue-300'
                          }`}
                        >
                          <p className="text-foreground mb-1">Comfortable</p>
                          <p className="text-muted-foreground text-xs">More spacing, easier to scan</p>
                        </button>
                        <button
                          onClick={() => setDensity('compact')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            density === 'compact'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                              : 'border-border hover:border-blue-300'
                          }`}
                        >
                          <p className="text-foreground mb-1">Compact</p>
                          <p className="text-muted-foreground text-xs">Denser layout, more content</p>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Interface Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="es-ES">Español</option>
                        <option value="fr-FR">Français</option>
                        <option value="de-DE">Deutsch</option>
                      </select>
                      <p className="text-muted-foreground text-xs mt-1">UI language only, does not affect data</p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <button
                        onClick={() => handleSave('Appearance settings saved')}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'my-account' && activeAccountScreen === 'notifications' && (
                <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                  <div className="mb-6">
                    <h2 className="text-foreground mb-1">Notifications</h2>
                    <p className="text-muted-foreground text-sm">Control how you receive alerts</p>
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-900 text-sm">
                        <strong>Note:</strong> These settings affect only your Super Admin alerts, not tenant notifications.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-foreground mb-1">Email Notifications</h3>
                          <p className="text-muted-foreground text-sm">Receive notifications via email</p>
                        </div>
                        <button
                          onClick={() => setEmailNotifications(!emailNotifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              emailNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-foreground mb-1">In-App Notifications</h3>
                          <p className="text-muted-foreground text-sm">Receive notifications in the application</p>
                        </div>
                        <button
                          onClick={() => setInAppNotifications(!inAppNotifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            inAppNotifications ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              inAppNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-3">Severity Preference</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={() => setSeverityPreference('critical')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            severityPreference === 'critical'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                              : 'border-border hover:border-blue-300'
                          }`}
                        >
                          <p className="text-foreground mb-1">Critical Only</p>
                          <p className="text-muted-foreground text-xs">Only critical alerts</p>
                        </button>
                        <button
                          onClick={() => setSeverityPreference('all')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            severityPreference === 'all'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                              : 'border-border hover:border-blue-300'
                          }`}
                        >
                          <p className="text-foreground mb-1">All Notifications</p>
                          <p className="text-muted-foreground text-xs">Receive all alerts</p>
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <button
                        onClick={() => handleSave('Notification preferences saved')}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PLATFORM PROFILE SCREENS */}
              {activeSection === 'platform-profile' && activePlatformScreen === 'branding' && (
                <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                  <div className="mb-6">
                    <h2 className="text-foreground mb-1">Platform Branding</h2>
                    <p className="text-muted-foreground text-sm">Define how your SaaS platform is branded and presented</p>
                    <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-amber-900 text-sm">
                        <strong>Important:</strong> Branding applies globally to the entire platform, not individual tenants.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-foreground mb-2">Platform Name</label>
                      <input
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-foreground mb-2">Platform Logo (Light Theme)</label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-blue-400 transition-colors cursor-pointer">
                          <div className="text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground text-sm mb-1">Upload logo</p>
                            <p className="text-muted-foreground text-xs">PNG, SVG (max 2MB)</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-foreground mb-2">Platform Logo (Dark Theme)</label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-blue-400 transition-colors cursor-pointer">
                          <div className="text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground text-sm mb-1">Upload logo</p>
                            <p className="text-muted-foreground text-xs">PNG, SVG (max 2MB)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Favicon</label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-blue-400 transition-colors cursor-pointer w-64">
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground text-sm mb-1">Upload favicon</p>
                          <p className="text-muted-foreground text-xs">ICO, PNG 32x32 or 64x64</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm text-foreground">Login Screen Preview</label>
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg hover:bg-accent text-sm">
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                      </div>
                      <div className="border border-border rounded-lg p-6 bg-muted">
                        <div className="bg-white rounded-lg p-8 text-center shadow-sm max-w-sm mx-auto">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4" />
                          <h3 className="text-foreground mb-2">{platformName}</h3>
                          <p className="text-muted-foreground text-sm">Login preview</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <button
                        onClick={() => handleSave('Platform branding updated')}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'platform-profile' && activePlatformScreen === 'contact' && (
                <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                  <div className="mb-6">
                    <h2 className="text-foreground mb-1">Platform Contact Identity</h2>
                    <p className="text-muted-foreground text-sm">Define how the platform identifies itself in communications</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-foreground mb-2">Support Email Address</label>
                      <input
                        type="email"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-muted-foreground text-xs mt-1">Primary contact for platform support inquiries</p>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Support Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={supportPhone}
                        onChange={(e) => setSupportPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">System Sender Name</label>
                      <input
                        type="text"
                        value={systemSenderName}
                        onChange={(e) => setSystemSenderName(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-muted-foreground text-xs mt-1">Used as the "From" name in automated emails</p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <button
                        onClick={() => handleSave('Contact identity updated')}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'platform-profile' && activePlatformScreen === 'metadata' && (
                <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                  <div className="mb-6">
                    <h2 className="text-foreground mb-1">Platform Metadata</h2>
                    <p className="text-muted-foreground text-sm">Basic product metadata for emails, footers, and documentation</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-foreground mb-2">Platform Description</label>
                      <textarea
                        value={platformDescription}
                        onChange={(e) => setPlatformDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-muted-foreground text-xs mt-1">Short description used in system communications</p>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Website URL</label>
                      <input
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Legal / Company Name</label>
                      <input
                        type="text"
                        value={legalName}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                      />
                      <p className="text-muted-foreground text-xs mt-1">Read-only. Contact support to update legal name.</p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <button
                        onClick={() => handleSave('Platform metadata updated')}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'platform-profile' && activePlatformScreen === 'defaults' && (
                <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                  <div className="mb-6">
                    <h2 className="text-foreground mb-1">Visual Defaults</h2>
                    <p className="text-muted-foreground text-sm">Define default UI behavior for new users</p>
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-900 text-sm">
                        <strong>Note:</strong> These are defaults only. Users can override these settings in their personal preferences.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-foreground mb-3">Default Theme for New Users</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={() => setDefaultTheme('light')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            defaultTheme === 'light'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                              : 'border-border hover:border-blue-300'
                          }`}
                        >
                          <div className="w-full h-12 bg-white border border-border rounded mb-2" />
                          <p className="text-foreground mb-1">Light</p>
                          <p className="text-muted-foreground text-xs">Recommended for most users</p>
                        </button>
                        <button
                          onClick={() => setDefaultTheme('dark')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            defaultTheme === 'dark'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                              : 'border-border hover:border-blue-300'
                          }`}
                        >
                          <div className="w-full h-12 bg-slate-800 border border-slate-700 rounded mb-2" />
                          <p className="text-foreground mb-1">Dark</p>
                          <p className="text-muted-foreground text-xs">Lower eye strain</p>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Default Language Fallback</label>
                      <select
                        value={defaultLanguage}
                        onChange={(e) => setDefaultLanguage(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="es-ES">Español</option>
                        <option value="fr-FR">Français</option>
                        <option value="de-DE">Deutsch</option>
                      </select>
                      <p className="text-muted-foreground text-xs mt-1">Used when user's preferred language is unavailable</p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <button
                        onClick={() => handleSave('Visual defaults updated')}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* Success Confirmation Toast */}
      {showConfirmation && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slide-up">
          <Check className="w-5 h-5" />
          <span>{confirmationMessage}</span>
        </div>
      )}
    </div>
  );
}

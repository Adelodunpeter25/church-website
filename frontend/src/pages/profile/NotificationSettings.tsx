

import { useState } from 'react';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: {
      announcements: true,
      events: true,
      sermons: false,
      membership: true,
      forms: false,
      reminders: true
    },
    pushNotifications: {
      announcements: true,
      events: false,
      sermons: true,
      membership: false,
      forms: true,
      reminders: true
    },
    frequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '07:00'
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggle = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof typeof prev[typeof category]]
      }
    }));
  };

  const handleFrequencyChange = (frequency: string) => {
    setSettings(prev => ({ ...prev, frequency }));
  };

  const handleQuietHoursToggle = () => {
    setSettings(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        enabled: !prev.quietHours.enabled
      }
    }));
  };

  const handleTimeChange = (type: 'start' | 'end', value: string) => {
    setSettings(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [type]: value
      }
    }));
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <i className="ri-check-circle-line text-green-400 text-lg mr-3 flex-shrink-0"></i>
            <div>
              <p className="text-sm font-medium text-green-800">Notification settings updated!</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Email Notifications */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
          <div className="space-y-4">
            {Object.entries(settings.emailNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive email notifications for {key.toLowerCase()}
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('emailNotifications', key)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    value ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      value ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
          <div className="space-y-4">
            {Object.entries(settings.pushNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive push notifications for {key.toLowerCase()}
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('pushNotifications', key)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    value ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      value ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Frequency */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Frequency</h3>
          <div className="space-y-3">
            {[
              { value: 'immediate', label: 'Immediate', description: 'Get notifications as they happen' },
              { value: 'daily', label: 'Daily Digest', description: 'Receive a summary once per day' },
              { value: 'weekly', label: 'Weekly Summary', description: 'Get a weekly roundup of activities' }
            ].map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={option.value}
                  name="frequency"
                  type="radio"
                  checked={settings.frequency === option.value}
                  onChange={() => handleFrequencyChange(option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                />
                <label htmlFor={option.value} className="ml-3 cursor-pointer">
                  <span className="block text-sm font-medium text-gray-700">{option.label}</span>
                  <span className="block text-sm text-gray-500">{option.description}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Quiet Hours</h3>
              <p className="text-sm text-gray-500">Pause notifications during specified hours</p>
            </div>
            <button
              onClick={handleQuietHoursToggle}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.quietHours.enabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.quietHours.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {settings.quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={settings.quietHours.start}
                  onChange={(e) => handleTimeChange('start', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  value={settings.quietHours.end}
                  onChange={(e) => handleTimeChange('end', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-save-line mr-2"></i>
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
}
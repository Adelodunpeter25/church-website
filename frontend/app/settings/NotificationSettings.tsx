'use client';

import { useState } from 'react';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    slackEnabled: false,
    webhooksEnabled: false,
    emailTemplates: {
      welcome: true,
      eventReminder: true,
      sermonUpload: false,
      membershipUpdate: true,
      systemAlert: true
    },
    notificationTypes: {
      newMember: { email: true, sms: false, push: true },
      eventRegistration: { email: true, sms: false, push: false },
      sermonUpload: { email: false, sms: false, push: true },
      systemAlert: { email: true, sms: true, push: true },
      formSubmission: { email: true, sms: false, push: false }
    },
    smtpSettings: {
      host: 'smtp.gmail.com',
      port: '587',
      username: 'notifications@gracechurch.org',
      password: '••••••••',
      encryption: 'tls'
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('general');

  const handleToggle = (category: string, setting: string, subSetting?: string) => {
    if (subSetting) {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [setting]: {
            ...prev[category as keyof typeof prev][setting as keyof typeof prev[typeof category]],
            [subSetting]: !prev[category as keyof typeof prev][setting as keyof typeof prev[typeof category]][subSetting as keyof typeof prev[typeof category][typeof setting]]
          }
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [setting]: !prev[setting as keyof typeof prev]
      }));
    }
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleTestNotification = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl">
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <i className="ri-check-circle-line text-green-400 text-lg mr-3 flex-shrink-0"></i>
            <div>
              <p className="text-sm font-medium text-green-800">Notification settings updated successfully!</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* General Notification Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Send notifications via email</p>
                </div>
                <button
                  onClick={() => handleToggle('', 'emailEnabled')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    settings.emailEnabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.emailEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                  <p className="text-sm text-gray-500">Send notifications via SMS</p>
                </div>
                <button
                  onClick={() => handleToggle('', 'smsEnabled')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    settings.smsEnabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.smsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Push Notifications</h4>
                  <p className="text-sm text-gray-500">Browser push notifications</p>
                </div>
                <button
                  onClick={() => handleToggle('', 'pushEnabled')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    settings.pushEnabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.pushEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Slack Integration</h4>
                  <p className="text-sm text-gray-500">Send alerts to Slack channels</p>
                </div>
                <button
                  onClick={() => handleToggle('', 'slackEnabled')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    settings.slackEnabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.slackEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
          <div className="space-y-4">
            {Object.entries(settings.notificationTypes).map(([type, channels]) => (
              <div key={type} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 capitalize">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <button className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer whitespace-nowrap">
                    Test Notification
                  </button>
                </div>
                <div className="flex space-x-8">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels.email}
                      onChange={() => handleToggle('notificationTypes', type, 'email')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels.sms}
                      onChange={() => handleToggle('notificationTypes', type, 'sms')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">SMS</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels.push}
                      onChange={() => handleToggle('notificationTypes', type, 'push')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">Push</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Templates */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(settings.emailTemplates).map(([template, enabled]) => (
              <div key={template} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 capitalize">
                    {template.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {template === 'welcome' && 'Sent to new members upon registration'}
                    {template === 'eventReminder' && 'Reminder sent before events'}
                    {template === 'sermonUpload' && 'Notify when new sermons are uploaded'}
                    {template === 'membershipUpdate' && 'Updates about membership status'}
                    {template === 'systemAlert' && 'Critical system notifications'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggle('emailTemplates', template)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      enabled ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    <i className="ri-edit-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SMTP Configuration */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SMTP Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
              <input
                type="text"
                value={settings.smtpSettings.host}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  smtpSettings: { ...prev.smtpSettings, host: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
              <input
                type="text"
                value={settings.smtpSettings.port}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  smtpSettings: { ...prev.smtpSettings, port: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={settings.smtpSettings.username}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  smtpSettings: { ...prev.smtpSettings, username: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={settings.smtpSettings.password}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  smtpSettings: { ...prev.smtpSettings, password: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
              <select
                value={settings.smtpSettings.encryption}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  smtpSettings: { ...prev.smtpSettings, encryption: e.target.value }
                }))}
                className="w-full pr-8 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">None</option>
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <button
                onClick={handleTestNotification}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Test Email
              </button>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            {[
              { type: 'New Member', message: 'Sarah Johnson joined the church', time: '2 hours ago', status: 'sent' },
              { type: 'Event Reminder', message: 'Youth Retreat reminder sent to 45 members', time: '4 hours ago', status: 'sent' },
              { type: 'Sermon Upload', message: 'New sermon "Walking in Faith" uploaded', time: '1 day ago', status: 'failed' },
              { type: 'System Alert', message: 'Weekly backup completed successfully', time: '2 days ago', status: 'sent' }
            ].map((notification, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{notification.type}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{notification.time}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    notification.status === 'sent' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {notification.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-save-line mr-2"></i>
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
}


import { useState } from 'react';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: 'daily',
    logLevel: 'info',
    cacheEnabled: true,
    compressionEnabled: true,
    maxUploadSize: '10',
    sessionTimeout: '30',
    emailService: 'smtp',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    storageProvider: 'local'
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [systemStatus] = useState({
    uptime: '15 days, 6 hours',
    cpuUsage: '24%',
    memoryUsage: '68%',
    diskSpace: '45%',
    activeUsers: 127,
    lastBackup: '2024-01-15 02:00 AM'
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleChange = (setting: string, value: string) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBackupNow = () => {
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
              <p className="text-sm font-medium text-green-800">System settings updated successfully!</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* System Status */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-time-line text-green-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">System Uptime</p>
                  <p className="text-lg font-bold text-gray-900">{systemStatus.uptime}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-cpu-line text-blue-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">CPU Usage</p>
                  <p className="text-lg font-bold text-gray-900">{systemStatus.cpuUsage}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-database-line text-orange-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                  <p className="text-lg font-bold text-gray-900">{systemStatus.memoryUsage}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-hard-drive-line text-purple-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Disk Space Used</p>
                  <p className="text-lg font-bold text-gray-900">{systemStatus.diskSpace}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-line text-indigo-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-lg font-bold text-gray-900">{systemStatus.activeUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-save-line text-green-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Last Backup</p>
                  <p className="text-lg font-bold text-gray-900">{systemStatus.lastBackup}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Control */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Control</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                <p className="text-sm text-gray-500">Temporarily disable public access for maintenance</p>
              </div>
              <button
                onClick={() => handleToggle('maintenanceMode')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Cache System</h4>
                <p className="text-sm text-gray-500">Enable caching to improve performance</p>
              </div>
              <button
                onClick={() => handleToggle('cacheEnabled')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  settings.cacheEnabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.cacheEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Compression</h4>
                <p className="text-sm text-gray-500">Compress data to reduce bandwidth usage</p>
              </div>
              <button
                onClick={() => handleToggle('compressionEnabled')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  settings.compressionEnabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.compressionEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Backup Settings */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Backup Settings</h3>
              <p className="text-sm text-gray-600">Configure automatic backups and data protection</p>
            </div>
            <button
              onClick={handleBackupNow}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-save-line mr-2"></i>
              Backup Now
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700">Automatic Backup</label>
                <button
                  onClick={() => handleToggle('autoBackup')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    settings.autoBackup ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.autoBackup ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => handleChange('backupFrequency', e.target.value)}
                  disabled={!settings.autoBackup}
                  className="w-full pr-8 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="hourly">Every Hour</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Backups</h4>
              <div className="space-y-2">
                {[
                  { name: 'backup_2024_01_15_02_00.zip', size: '234 MB', date: '15 Jan 2024' },
                  { name: 'backup_2024_01_14_02_00.zip', size: '231 MB', date: '14 Jan 2024' },
                  { name: 'backup_2024_01_13_02_00.zip', size: '229 MB', date: '13 Jan 2024' }
                ].map((backup, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{backup.name}</p>
                      <p className="text-xs text-gray-500">{backup.size} • {backup.date}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      <i className="ri-download-line"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Settings */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Upload Size (MB)
              </label>
              <input
                type="number"
                value={settings.maxUploadSize}
                onChange={(e) => handleChange('maxUploadSize', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Log Level
              </label>
              <select
                value={settings.logLevel}
                onChange={(e) => handleChange('logLevel', e.target.value)}
                className="w-full pr-8 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="error">Error Only</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage Provider
              </label>
              <select
                value={settings.storageProvider}
                onChange={(e) => handleChange('storageProvider', e.target.value)}
                className="w-full pr-8 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="local">Local Storage</option>
                <option value="s3">Amazon S3</option>
                <option value="google">Google Cloud</option>
                <option value="azure">Azure Storage</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-save-line mr-2"></i>
            Save System Settings
          </button>
        </div>
      </div>
    </div>
  );
}
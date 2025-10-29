'use client';

import { useState } from 'react';

export default function IntegrationSettings() {
  const [integrations, setIntegrations] = useState({
    paypal: { enabled: false, clientId: '', clientSecret: '' },
    stripe: { enabled: true, publishableKey: 'pk_test_...', secretKey: 'sk_test_...' },
    mailchimp: { enabled: false, apiKey: '', listId: '' },
    zoom: { enabled: true, apiKey: 'your_zoom_api_key', secretKey: 'your_zoom_secret' },
    youtube: { enabled: false, apiKey: '', channelId: '' },
    facebook: { enabled: false, appId: '', appSecret: '' },
    google: { enabled: true, clientId: 'your_google_client_id', clientSecret: 'your_google_secret' },
    slack: { enabled: false, webhookUrl: '', channel: '#general' }
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [testResults, setTestResults] = useState({});

  const integrationConfigs = {
    paypal: {
      name: 'PayPal',
      description: 'Accept donations and payments via PayPal',
      icon: 'ri-paypal-line',
      color: 'bg-blue-500',
      fields: ['clientId', 'clientSecret']
    },
    stripe: {
      name: 'Stripe',
      description: 'Process credit card payments and donations',
      icon: 'ri-bank-card-line',
      color: 'bg-purple-500',
      fields: ['publishableKey', 'secretKey']
    },
    mailchimp: {
      name: 'Mailchimp',
      description: 'Email marketing and newsletter management',
      icon: 'ri-mail-line',
      color: 'bg-yellow-500',
      fields: ['apiKey', 'listId']
    },
    zoom: {
      name: 'Zoom',
      description: 'Video conferencing and online meetings',
      icon: 'ri-video-line',
      color: 'bg-blue-600',
      fields: ['apiKey', 'secretKey']
    },
    youtube: {
      name: 'YouTube',
      description: 'Stream sermons and upload videos',
      icon: 'ri-youtube-line',
      color: 'bg-red-500',
      fields: ['apiKey', 'channelId']
    },
    facebook: {
      name: 'Facebook',
      description: 'Social media integration and live streaming',
      icon: 'ri-facebook-line',
      color: 'bg-blue-700',
      fields: ['appId', 'appSecret']
    },
    google: {
      name: 'Google Workspace',
      description: 'Calendar, Drive, and email integration',
      icon: 'ri-google-line',
      color: 'bg-green-500',
      fields: ['clientId', 'clientSecret']
    },
    slack: {
      name: 'Slack',
      description: 'Team communication and notifications',
      icon: 'ri-slack-line',
      color: 'bg-purple-600',
      fields: ['webhookUrl', 'channel']
    }
  };

  const handleToggle = (integration: string) => {
    setIntegrations(prev => ({
      ...prev,
      [integration]: {
        ...prev[integration as keyof typeof prev],
        enabled: !prev[integration as keyof typeof prev].enabled
      }
    }));
  };

  const handleFieldChange = (integration: string, field: string, value: string) => {
    setIntegrations(prev => ({
      ...prev,
      [integration]: {
        ...prev[integration as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleTest = (integration: string) => {
    setTestResults(prev => ({ ...prev, [integration]: 'testing' }));
    
    setTimeout(() => {
      setTestResults(prev => ({ 
        ...prev, 
        [integration]: Math.random() > 0.3 ? 'success' : 'error' 
      }));
    }, 2000);
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getTestResultColor = (result: string) => {
    switch (result) {
      case 'testing': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTestResultIcon = (result: string) => {
    switch (result) {
      case 'testing': return 'ri-loader-line animate-spin';
      case 'success': return 'ri-check-circle-line';
      case 'error': return 'ri-error-warning-line';
      default: return 'ri-play-circle-line';
    }
  };

  return (
    <div className="max-w-4xl">
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <i className="ri-check-circle-line text-green-400 text-lg mr-3 flex-shrink-0"></i>
            <div>
              <p className="text-sm font-medium text-green-800">Integration settings saved successfully!</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Integration Overview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-green-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-600">Active</p>
                  <p className="text-2xl font-bold text-green-900">
                    {Object.values(integrations).filter(i => i.enabled).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <i className="ri-close-circle-line text-gray-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Inactive</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Object.values(integrations).filter(i => !i.enabled).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-apps-line text-blue-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-600">Total</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {Object.keys(integrations).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-error-warning-line text-orange-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-orange-600">Errors</p>
                  <p className="text-2xl font-bold text-orange-900">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Cards */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Integrations</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(integrationConfigs).map(([key, config]) => {
              const integration = integrations[key as keyof typeof integrations];
              const testResult = testResults[key as keyof typeof testResults];
              
              return (
                <div key={key} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${config.color} rounded-lg flex items-center justify-center`}>
                        <i className={`${config.icon} text-white text-xl`}></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900">{config.name}</h4>
                        <p className="text-sm text-gray-600">{config.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(key)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        integration.enabled ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          integration.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {integration.enabled && (
                    <div className="space-y-4">
                      {config.fields.map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {field.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <input
                            type={field.toLowerCase().includes('secret') ? 'password' : 'text'}
                            value={integration[field as keyof typeof integration] as string}
                            onChange={(e) => handleFieldChange(key, field, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                          />
                        </div>
                      ))}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${getTestResultColor(testResult as string)}`}>
                            {testResult === 'testing' && 'Testing connection...'}
                            {testResult === 'success' && 'Connection successful'}
                            {testResult === 'error' && 'Connection failed'}
                            {!testResult && 'Not tested'}
                          </span>
                        </div>
                        <button
                          onClick={() => handleTest(key)}
                          disabled={testResult === 'testing'}
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
                        >
                          <i className={`${getTestResultIcon(testResult as string)} mr-2`}></i>
                          Test Connection
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Webhook Settings */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Webhook Settings</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value="https://gracechurch.org/api/webhooks"
                    readOnly
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 bg-gray-100 text-sm"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg text-sm hover:bg-blue-700 cursor-pointer whitespace-nowrap">
                    Copy
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Use this URL to receive webhooks from external services
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook Events
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'member.created',
                    'member.updated', 
                    'event.registered',
                    'donation.received',
                    'sermon.uploaded',
                    'form.submitted'
                  ].map((event) => (
                    <label key={event} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-700">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Keys</h3>
          <div className="space-y-4">
            {[
              { name: 'Production API Key', value: 'pk_live_...', status: 'Active' },
              { name: 'Test API Key', value: 'pk_test_...', status: 'Active' },
              { name: 'Webhook Secret', value: 'whsec_...', status: 'Active' }
            ].map((apiKey, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{apiKey.name}</p>
                  <p className="text-sm text-gray-600 font-mono">{apiKey.value}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {apiKey.status}
                  </span>
                  <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
                    <i className="ri-eye-line"></i>
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    <i className="ri-file-copy-line"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-800 cursor-pointer">
                    <i className="ri-refresh-line"></i>
                  </button>
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
            Save Integration Settings
          </button>
        </div>
      </div>
    </div>
  );
}
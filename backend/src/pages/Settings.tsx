import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@components/ui/Button';


const Settings = () => {
  const [scanningPreference, setScanningPreference] = useState<string>('Full Scan');
  const [autoDownloadReports, setAutoDownloadReports] = useState<boolean>(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);

  const handleSaveSettings = () => {
    // Save settings logic (could send to backend or local storage)
    alert('Settings saved!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 text-white bg-[#0d1117]"
    >
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      <p className="text-lg text-gray-400 mb-8">Configure your scanning preferences and tool settings.</p>

      {/* Scanning Preference */}
      <Card className="bg-[#161b22] rounded-xl shadow-md hover:shadow-xl transition-shadow mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Scanning Preference</h2>
          <select
            value={scanningPreference}
            onChange={(e) => setScanningPreference(e.target.value)}
            className="w-full p-2 text-gray-900 bg-[#f1f1f1] rounded-lg"
          >
            <option value="Full Scan">Full Scan</option>
            <option value="Quick Scan">Quick Scan</option>
            <option value="Custom Scan">Custom Scan</option>
          </select>
        </CardContent>
      </Card>

      {/* Auto Download Reports */}
      <Card className="bg-[#161b22] rounded-xl shadow-md hover:shadow-xl transition-shadow mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Auto Download Reports</h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={autoDownloadReports}
              onChange={(e) => setAutoDownloadReports(e.target.checked)}
              className="mr-2"
            />
            <span className="text-gray-400">Automatically download reports after scan completion</span>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="bg-[#161b22] rounded-xl shadow-md hover:shadow-xl transition-shadow mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Advanced Settings</h2>
          <Button onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}>
            {showAdvancedSettings ? 'Hide' : 'Show'} Advanced Settings
          </Button>

          {showAdvancedSettings && (
            <div className="mt-4 text-gray-400">
              {/* Here you can add more advanced settings like tool integration, API keys, etc. */}
              <p>Advanced settings will be shown here, like tool integrations, etc.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="mt-8">
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </motion.div>
  );
};

export default Settings;

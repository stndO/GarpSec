import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const mockNetworkData = [
  { name: 'Device 1', ip: '192.168.1.1', status: 'active', details: 'Router, Open Ports: 22, 80' },
  { name: 'Device 2', ip: '192.168.1.2', status: 'inactive', details: 'Server, Open Ports: 443, 8080' },
  { name: 'Device 3', ip: '192.168.1.3', status: 'active', details: 'Workstation, Open Ports: 21, 80' },
  { name: 'Device 4', ip: '192.168.1.4', status: 'active', details: 'Firewall, Open Ports: 53, 443' },
];

const NetworkMap = () => {
  const [devices, setDevices] = useState(mockNetworkData);

  useEffect(() => {
    // Fetch network map data from backend or perform scan here (simulated with mock data)
    const interval = setInterval(() => {
      setDevices(prevDevices => prevDevices.map(device => ({
        ...device,
        status: device.status === 'active' ? 'inactive' : 'active', // toggle for mock animation
      })));
    }, 5000); // Simulate status change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#181C24] p-8 text-white"
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-500 mb-6">Network Map</h1>
        <p className="text-lg text-gray-300 mb-8">Visualize your network devices and their connections.</p>

        {/* Network Map */}
        <div className="mb-6 bg-[#242A34] p-6 rounded-lg shadow-xl">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-100">Connected Devices</h2>
            <button
              className="text-blue-500 hover:text-blue-300 transition duration-200"
              onClick={() => alert('Refresh the network map')}>
              Refresh
            </button>
          </div>

          {/* Mock Network Devices List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device, index) => (
              <motion.div
                key={index}
                className="bg-[#2D353F] p-4 rounded-lg shadow-md hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold text-gray-300">{device.name}</h3>
                <p className="text-sm text-gray-400">IP: {device.ip}</p>
                <p className={`text-sm ${device.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                  Status: {device.status}
                </p>
                <p className="text-xs text-gray-500 mt-2">{device.details}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Network Traffic Graph */}
        <div className="mb-6 bg-[#242A34] p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Network Traffic</h2>

          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={[
              { time: '00:00', traffic: 20 },
              { time: '01:00', traffic: 50 },
              { time: '02:00', traffic: 30 },
              { time: '03:00', traffic: 70 },
              { time: '04:00', traffic: 90 },
            ]}>
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="traffic" stroke="#8884d8" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Interactive Network Visualization */}
        <div className="bg-[#242A34] p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Interactive Network Visualization</h2>
          {/* Placeholder for network visualization */}
          <div className="bg-[#161b22] h-64 rounded-md flex items-center justify-center text-gray-400">
            Interactive Network Graph Here (Implement with tools like React Flow)
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default NetworkMap;

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const networkData = [
  { name: "Secure", value: 70 },
  { name: "Warning", value: 20 },
  { name: "Critical", value: 10 },
];
const COLORS = ["#00C49F", "#FFBB28", "#FF4444"];

const initialThreatAnalytics = [
  { time: "10:00", attacks: 2 },
  { time: "10:05", attacks: 5 },
  { time: "10:10", attacks: 3 },
  { time: "10:15", attacks: 7 },
];

const systemActivity = [
  { name: "CPU", usage: 65 },
  { name: "Memory", usage: 40 },
  { name: "Network", usage: 80 },
];

const Dashboard = () => {
  const [threatData, setThreatData] = useState(initialThreatAnalytics);
  const [threats, setThreats] = useState<string[]>([]);

  // Simulate dynamic data
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatData(prev => [
        ...prev.slice(1),
        { time: new Date().toLocaleTimeString().slice(0,5), attacks: Math.floor(Math.random() * 10) },
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreats(prev => [
        ...prev,
        `⚡ Threat detected at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
	<h1 className="text-4xl font-bold mb-2 underline decoration-pink-500 underline-offset-4"> Dashboard</h1>

        
        <p className="text-lg mb-8 text-gray-400">Red Team Intelligence - Threat Monitoring Overview</p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Cards */}
        {[ 
          { title: "Network Scan", chart: 
              <PieChartComponent /> },
          { title: "Threat Analytics", chart: 
              <LineChartComponent data={threatData} /> },
          { title: "System Activity", chart: 
              <BarChartComponent data={systemActivity} /> },
          { title: "AI Watcher", chart: 
              <Placeholder text="AI monitoring system" /> },
          { title: "Top Ports Scanned", chart: 
              <Placeholder text="Port scan stats" /> }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 90, delay: 0.2 * index }}
          >
            <Card className="bg-[#161b22] hover:scale-105 hover:shadow-2xl transition-transform duration-300 rounded-xl">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4">{item.title}</h2>
                <div className="h-40">{item.chart}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Threat Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, delay: 1 }}
          className="col-span-1 md:col-span-2"
        >
          <Card className="bg-[#161b22] hover:scale-105 hover:shadow-2xl transition-transform duration-300 rounded-xl">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Threat Timeline</h2>
              <div className="h-64 bg-gray-800 rounded-md p-4 overflow-y-auto space-y-2 custom-scrollbar"
		style={{ scrollbarWidth: 'thin', scrollBehavior: 'smooth' }}>
                {threats.length === 0 ? (
                  <div className="text-center text-gray-500">No threats detected yet.</div>
                ) : (
                  <AnimatePresence>
                    {threats.map((threat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-gradient-to-r from-[#ff4d4d] via-[#ff7b00] to-[#ffcc00] text-black p-3 rounded-lg shadow-md"
                      >
                        {threat}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

// Pie Chart
const PieChartComponent = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 80 }}
    className="h-full"
  >
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={networkData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
          {networkData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </motion.div>
);


// Line Chart
const LineChartComponent = ({ data }: { data: any[] }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 80 }}
    className="h-full"
  >
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="time" stroke="#8884d8" />
        <YAxis stroke="#8884d8" />
        <Tooltip />
        <Line type="monotone" dataKey="attacks" stroke="#FF4444" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>
);


// Bar Chart
const BarChartComponent = ({ data }: { data: any[] }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 80 }}
    className="h-full"
  >
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis stroke="#8884d8" />
        <Tooltip />
        <Bar dataKey="usage" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  </motion.div>
);


// Placeholder
const Placeholder = ({ text }: { text: string }) => (
  <div className="h-40 bg-gray-800 rounded-md flex items-center justify-center text-gray-400">
    {text}
  </div>
);

export default Dashboard;

import { motion } from 'framer-motion';
import { useState } from 'react';
import api from '@/lib/api'; // Make sure this API client is properly configured

const NetworkScan = () => {
  const [tool, setTool] = useState('Nmap');
  const [target, setTarget] = useState('');
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Handlers
  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleToolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTool(e.target.value);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.value);
  };

  // Scan execution with backend integration
  const runScan = async () => {
    if (!target) {
      setOutput('Error: Please enter a target');
      return;
    }

    setIsScanning(true);
    setOutput('Initializing scan...');

    try {

      const response = await api.post('/scans/run', {	
 		 scan_type: tool.toLowerCase(),
	         target: target,
 		 command: command
	});


      // Polling function
      const pollResults = async (scanId: string) => {
        try {
          const { data } = await api.get(`/scans/${scanId}`);
          
          if (data.status === 'completed') {
            setOutput(data.result);
            setIsScanning(false);
          } else if (data.status === 'failed') {
            setOutput(`Scan failed: ${data.error}`);
            setIsScanning(false);
          } else {
            setOutput(`Scan progress: ${data.progress || 'working'}...`);
            setTimeout(() => pollResults(scanId), 2000);
          }
        } catch (error) {
          setOutput('Error polling scan results');
          setIsScanning(false);
        }
      };

      pollResults(response.data.id);
    } catch (error) {
      setOutput('Error initiating scan');
      setIsScanning(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#181C24] p-8 text-white"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-500 mb-4">Network Scan</h1>
        <p className="text-lg text-gray-300 mb-8">Select a tool, enter scan parameters, and start the scan.</p>

        {/* Tool Selection */}
        <div className="mb-6">
          <label htmlFor="tool" className="text-lg text-gray-400 mb-2 block">Select Tool:</label>
          <select
            id="tool"
            value={tool}
            onChange={handleToolChange}
            className="bg-[#242A34] text-white border border-gray-600 p-3 rounded-lg w-full focus:ring-2 focus:ring-pink-500"
          >
            <option value="Nmap">Nmap</option>
            <option value="Masscan">Masscan</option>
            <option value="Nikto">Nikto</option>
            <option value="ZMap">ZMap</option>
          </select>
        </div>

        {/* Target Input */}
        <div className="mb-6">
          <label htmlFor="target" className="text-lg text-gray-400 mb-2 block">Scan Target:</label>
          <input
            type="text"
            id="target"
            value={target}
            onChange={handleTargetChange}
            placeholder="Enter IP/Range (e.g., 192.168.1.1-100)"
            className="w-full p-4 bg-[#242A34] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Command Input */}
        <div className="mb-6">
          <label htmlFor="command" className="text-lg text-gray-400 mb-2 block">Scan Parameters:</label>
          <input
            type="text"
            id="command"
            value={command}
            onChange={handleCommandChange}
            placeholder={`e.g., ${tool === 'Nmap' ? '-sS -sV -O' : '-p 80,443'}`}
            className="w-full p-4 bg-[#242A34] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Start Scan Button */}
        <button
          onClick={runScan}
          disabled={isScanning}
          className={`bg-blue-600 text-white px-8 py-3 rounded-lg transition duration-200 ${
            isScanning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </button>

        {/* Output Display */}
        <div className="mt-8 bg-[#242A34] p-6 rounded-lg max-h-96 overflow-y-auto shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">Scan Output:</h3>
          <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
            {output}
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkScan;

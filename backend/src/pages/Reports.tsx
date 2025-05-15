import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@components/ui/Button';


const Reports = () => {
  const reports = [
    {
      title: 'Port Scan Report',
      date: '2025-04-28',
      description: 'Scan for open ports and services on the target network.',
    },
    {
      title: 'Vulnerability Scan Report',
      date: '2025-04-28',
      description: 'Scan for known vulnerabilities based on CVE database.',
    },
    {
      title: 'Web Application Scan Report',
      date: '2025-04-28',
      description: 'Scan for web vulnerabilities like XSS, SQLi, etc.',
    },
    {
      title: 'Misconfiguration Scan Report',
      date: '2025-04-28',
      description: 'Scan for misconfigurations in the system and services.',
    },
  ];

  const downloadReport = (title: string) => {
    // Simulate downloading report (you can implement PDF generation or other formats)
    alert(`Downloading ${title} report...`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 text-white bg-[#0d1117]"
    >
      <h1 className="text-4xl font-bold mb-8">Reports</h1>
      <p className="text-lg text-gray-400 mb-8">View and download the results of your scans.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="bg-[#161b22] rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
              <p className="text-gray-400 mb-4">{report.description}</p>
              <p className="text-gray-500">Date: {report.date}</p>
              <Button
                className="mt-4"
                onClick={() => downloadReport(report.title)}
              >
                Download Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default Reports;

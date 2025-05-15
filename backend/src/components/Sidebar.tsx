// src/components/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  ShieldAlert,
  Map,
  Users,
  Settings,
  Target,
  Radar,
  FileText,
} from 'lucide-react'; // beautiful icon pack

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/vulnerability-scan', label: 'Vulnerability Scan', icon: ShieldAlert },
    { path: '/network-map', label: 'Network Map', icon: Map },
    { path: '/user-enumeration', label: 'User Enumeration', icon: Users },
    { path: '/exploitation', label: 'Exploitation', icon: Target },
    { path: '/network-scan', label: 'Network Scan', icon: Radar },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-[#161b22] text-white flex flex-col shadow-lg">
      <div className="text-2xl font-bold p-6 text-center tracking-wide">
        GarpSec
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {links.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link key={path} to={path}>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: '#1f2937' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex items-center px-4 py-3 rounded-md cursor-pointer transition-all ${
                  isActive ? 'bg-[#1f2937] text-blue-400 font-semibold' : 'hover:bg-[#1f2937]'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="text-sm">{label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;


import { useEffect, useState } from 'react';
import { FaGlobe, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Header({ onLogout }: { onLogout: () => void }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-6 bg-[#FFFAFA] shadow-sm">
      {/* Left: Date & Time */}
      <div>
        <p className="text-sm text-gray-500">Today is</p>
        <p className="text-md font-medium text-gray-800">{currentTime}</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Language */}
        <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 text-sm text-gray-700">
          <FaGlobe />
          <select className="bg-transparent outline-none">
            <option>English</option>
            <option>Chinese</option>
            <option>French</option>
          </select>
        </div>

        {/* Icons */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 text-[#FC4341]">
          <FaUser />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 text-[#FC4341]">
          <FaCog />
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="px-3 py-1 rounded bg-red-100 text-[#FC4341] font-medium text-sm hover:bg-red-200"
        >
          <FaSignOutAlt className="inline-block mr-1" /> Logout
        </button>
      </div>
    </header>
  );
}

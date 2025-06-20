  'use client';
  import { FaBuilding, FaCheckCircle } from 'react-icons/fa';
  import { Bar } from 'react-chartjs-2';
  import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  const data = {
    labels: ['Company', 'Tenants', 'Agents', 'Property', 'Subscription Plan', 'Active Company'],
    datasets: [
      {
        label: 'Count',
        data: [6, 9, 6, 10, 2, 6],
        backgroundColor: '#FC4341',
      },
    ],
  };

  const companies = [
    { name: 'Lakhani Builders', email: 'lakhani@gmail.com' },
    { name: 'taawil', email: 'taawil@gmail.com' },
    { name: 'samytechindoreMP', email: 'aman.assti@samytech.in' },
    { name: 'Company Properties Pvt Ltd', email: 'company.admin@gmail.com' },
    { name: 'Jairaj Properties Pvt Ltd', email: 'jairaj.kishen@samytech.in' },
    { name: 'Sunshine Properties Pvt Ltd', email: 'gopal@gmac.in' },
  ];

  export default function Home() {
    return (
      <div className="bg-[#FFF3F3] p-6 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Cards + Chart (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FC4341] text-white rounded p-6 flex items-center gap-4 shadow">
                <FaBuilding className="text-3xl" />
                <div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="font-poppins font-semibold text-sm">Total Company</p>
                </div>
              </div>
              <div className="bg-[#FC4341] text-white rounded p-6 flex items-center gap-4 shadow">
                <FaBuilding className="text-3xl" />
                <div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="font-poppins font-semibold text-sm">Active Company</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-poppins font-semibold mb-4 text-gray-800">
                Admin Dashboard Overview
              </h3>
              <Bar data={data} />
            </div>
          </div>

          {/* Right: Total Companies */}
          <div className="bg-white p-6 rounded shadow h-full">
            <h3 className="text-lg font-poppins font-semibold mb-4 text-gray-800">
              Total Companies
            </h3>
            <ul className="space-y-4 text-sm text-gray-700">
              {companies.map((company, idx) => (
                <li key={idx} className="flex justify-between items-start border-b pb-2">
                  <div>
                    <p className="font-poppins font-semibold text-sm">{company.name}</p>
                    <p className="text-gray-500 text-xs">{company.email}</p>
                  </div>
                  <FaCheckCircle className="text-green-500 mt-1" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

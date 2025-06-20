'use client';

import { useState } from 'react';
import {
  FaPlus, FaFilter, FaThList, FaDownload, FaEllipsisV
} from 'react-icons/fa';

const initialCompanies = [
  {
    name: 'Lakhani Builders',
    email: 'lakhani@gmail.com',
    phone: '334432342',
    address: 'New York',
    status: true,
  },
  {
    name: 'Taawil',
    email: 'taawil@gmail.com',
    phone: '2929292929',
    address: 'New York',
    status: true,
  },
  {
    name: 'SamytechindoreMP',
    email: 'aman.assti@samytech.in',
    phone: '7896912481',
    address: 'New York',
    status: true,
  },
  {
    name: 'Company Properties Pvt Ltd',
    email: 'company.admin@gmail.com',
    phone: '975394772',
    address: 'New York',
    status: true,
  },
  {
    name: 'Jairaj Properties Pvt Ltd',
    email: 'jairaj.kishen@samytech.in',
    phone: '975394772',
    address: 'New York',
    status: true,
  },
  {
    name: 'Sunshine Properties Pvt Ltd',
    email: 'gopal@gmac.in',
    phone: '975394772',
    address: 'New York',
    status: true,
  },
];

export default function CompanyManagementPage() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '', email: '', phone: '', address: '', status: true,
  });

  const handleToggleStatus = (index: number) => {
    const updated = [...companies];
    updated[index].status = !updated[index].status;
    setCompanies(updated);
  };

  const handleAddCompany = () => {
    setCompanies([...companies, newCompany]);
    setNewCompany({ name: '', email: '', phone: '', address: '', status: true });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-poppins font-semibold text-gray-800">Company Management</h2>
          <p className="text-sm text-gray-500">Home / Company Management</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FC4341] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-600"
        >
          <FaPlus className="inline mr-2" />
          Add Company
        </button>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
        <div className="flex gap-3 text-sm text-gray-600">
          <button className="flex items-center gap-1"><FaThList /> Columns</button>
          <button className="flex items-center gap-1"><FaFilter /> Filters</button>
          <button className="flex items-center gap-1"><FaThList /> Density</button>
          <button className="flex items-center gap-1"><FaDownload /> Export</button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="border text-sm px-3 py-2 rounded w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#FFF3F3] text-[#FC4341]">
            <tr>
              <th className="px-4 py-3">S.No</th>
              <th className="px-4 py-3">Company Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone No</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index} className="border-t hover:bg-[#FFF9F9]">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 text-[#FC4341] font-medium">{company.name}</td>
                <td className="px-4 py-2">{company.email}</td>
                <td className="px-4 py-2">{company.phone}</td>
                <td className="px-4 py-2">{company.address}</td>
                <td className="px-4 py-2">
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={company.status}
                      onChange={() => handleToggleStatus(index)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-checked:bg-[#FC4341] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
                </td>
                <td className="px-4 py-2 text-right">
                  <button className="text-gray-500 hover:text-[#FC4341]">
                    <FaEllipsisV />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-3 border-t text-sm text-gray-600">
          <span>Rows per page:</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>100</option>
            <option>50</option>
            <option>25</option>
          </select>
          <span>1–{companies.length} of {companies.length}</span>
          <div className="flex gap-2">
            <button>{'<'}</button>
            <button>{'>'}</button>
          </div>
        </div>
      </div>

      {/* Add Company Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-[#FC4341]">Add Company</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Company Name" value={newCompany.name}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                className="w-full border px-3 py-2 rounded text-sm" />
              <input type="email" placeholder="Email" value={newCompany.email}
                onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                className="w-full border px-3 py-2 rounded text-sm" />
              <input type="text" placeholder="Phone No" value={newCompany.phone}
                onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                className="w-full border px-3 py-2 rounded text-sm" />
              <input type="text" placeholder="Address" value={newCompany.address}
                onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                className="w-full border px-3 py-2 rounded text-sm" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm rounded bg-gray-200">Cancel</button>
              <button onClick={handleAddCompany} className="px-4 py-2 text-sm rounded bg-[#FC4341] text-white hover:bg-red-600">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

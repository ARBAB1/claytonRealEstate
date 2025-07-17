'use client';

import { useEffect, useState } from 'react';
import {
    FaPlus,
    FaPhone,
    FaMapMarkerAlt,
    FaUser,
    FaEye,
    FaEyeSlash,
    FaTrash,
    FaEdit,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import {
    createCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany,
    searchCompanies,
    checkUsernameExists,
} from '../../home/_components/constants/Apis';

interface Company {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    username: string;
    password: string;
    status: boolean;
}

export default function CompanyManagementPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCompany, setEditCompany] = useState<Company | null>(null);
    const [formData, setFormData] = useState<Company>({
        name: '',
        email: '',
        phone: '',
        address: '',
        username: '',
        password: '',
        status: false,
    });
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search.trim() !== '') {
                handleSearch(search);
            } else {
                fetchCompanies(page);
            }
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [page, search]);

    const handleSearch = async (query: string) => {
        try {
            const results = await searchCompanies(query);
            setCompanies(results);
            setTotalPages(1);
            setPage(1);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const fetchCompanies = async (pg = 1) => {
        try {
            const res = await getAllCompanies(pg, limit);
            setCompanies(res.data);
            setTotalPages(res.totalPages);
            setPage(res.currentPage);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleSaveCompany = async () => {
        try {
            setUsernameError(null);
            const isDuplicate = await checkUsernameExists(formData.username);
            const isUsernameChanged = editCompany && editCompany.username !== formData.username;

            if ((!editCompany && isDuplicate) || (editCompany && isDuplicate && isUsernameChanged)) {
                setUsernameError('Username already taken. Please choose another.');
                return;
            }

            if (editCompany) {
                await updateCompany(editCompany.id!, formData);
            } else {
                await createCompany(formData);
            }

            resetForm();
            await fetchCompanies(1);
            setPage(1);
        } catch (error) {
            console.error('Error saving company:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            username: '',
            password: '',
            status: false,
        });
        setEditCompany(null);
        setIsModalOpen(false);
    };
    const handleToggleStatus = async (company: Company) => {
        try {
            const updatedCompany = { ...company, status: !company.status };
            await updateCompany(company.id!, updatedCompany);

            // Update company list in state immediately
            setCompanies((prev) =>
                prev.map((c) => (c.id === company.id ? updatedCompany : c))
            );
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };



    const handleEditClick = (company: Company) => {
        setFormData(company);
        setEditCompany(company);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id: number) => {
        try {
            await deleteCompany(id);
            await fetchCompanies(1);
            setPage(1);
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#FC4341]">Company Management</h2>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-[#FC4341] text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm"
                >
                    <FaPlus /> Add Company
                </button>
            </div>
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by Company name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-sm px-4 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#FC4341]"
                />

            </div>

            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-[#FFF3F3] text-[#FC4341]">
                        <tr>
                            <th className="px-4 py-3">S.No</th>
                            <th className="px-4 py-3">Company Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone No</th>
                            <th className="px-4 py-3">Username</th>
                            <th className="px-4 py-3">Password</th>
                            <th className="px-4 py-3">Address</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies?.map((company, index) => (
                            <tr key={company?.id ?? index} className="border-t hover:bg-[#FFF9F9]">
                                <td className="px-4 py-2">{company.id}</td>
                                <td className="px-4 py-2 text-[#FC4341] font-medium">{company.name}</td>
                                <td className="px-4 py-2">{company.email}</td>
                                <td className="px-4 py-2">{company.phone}</td>
                                <td className="px-4 py-2">{company.username}</td>
                                <td className="px-4 py-2">{company.password}</td>
                                <td className="px-4 py-2">{company.address}</td>

                                <td className="px-4 py-2">
                                    <label className="inline-flex relative items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={company.status}
                                            onChange={() => handleToggleStatus(company)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-checked:bg-[#FC4341] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                    </label>
                                </td>


                                <td className="px-4 py-2 flex justify-center gap-3">
                                    <button
                                        onClick={() => handleEditClick(company)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(company.id!)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 p-4">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className={`px-3 py-1 text-sm rounded border ${page === 1
                                ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                                : 'text-[#FC4341] border-[#FC4341] hover:bg-[#FC4341] hover:text-white'
                                }`}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNum = index + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    className={`px-3 py-1 text-sm rounded border ${pageNum === page
                                        ? 'bg-[#FC4341] text-white border-[#FC4341]'
                                        : 'text-[#FC4341] border-[#FC4341] hover:bg-[#FC4341] hover:text-white'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className={`px-3 py-1 text-sm rounded border ${page === totalPages
                                ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                                : 'text-[#FC4341] border-[#FC4341] hover:bg-[#FC4341] hover:text-white'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6">
                        <h3 className="text-xl font-semibold text-[#FC4341]">
                            {editCompany ? 'Edit Company' : 'Add Company'}
                        </h3>

                        {/* Company Name */}
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border pl-10 pr-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4341]"
                            />
                        </div>

                        <div className="space-y-4">
                            {/* Username */}
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={(e) => {
                                        setFormData({ ...formData, username: e.target.value });
                                        setUsernameError(null);
                                    }}
                                    className="w-full border pl-10 pr-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4341]"
                                />
                            </div>

                            {usernameError && (
                                <p className="text-red-500 text-xs mt-1">{usernameError}</p>
                            )}

                            {/* Password */}
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full border px-3 py-2 rounded text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-[#FC4341]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <MdEmail className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border pl-10 pr-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4341]"
                                />
                            </div>

                            {/* Phone */}
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full border pl-10 pr-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4341]"
                                />
                            </div>

                            {/* Address */}
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full border pl-10 pr-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4341]"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCompany}
                                className="px-4 py-2 text-sm rounded bg-[#FC4341] text-white hover:bg-red-600 transition"
                            >
                                {editCompany ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

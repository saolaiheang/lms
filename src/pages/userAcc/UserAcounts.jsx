import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import CreateButton from '../../components/CreateButton';

function UserAccountListPage() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                console.error("Token is missing");
                return;
            }
            try {
                const response = await axios.get('http://localhost:3000/api/user_accounts', {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching users", err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <div className="container mx-auto p-4 ">
                <h1 className="text-2xl font-bold mb-4">User Accounts</h1>
                <CreateButton/>

                <table className=' min-w-full bg-white  border border-gray-200 rounded '>
                    <thead className=''>
                        <tr className="w-full bg-gray-100 border-b ">
                            <th className="py-2 px-4 border-r text-left">Action</th>
                            <th className="py-2 px-4 border-r text-left">ID</th>
                            <th className="py-2 px-4 border-r text-left">Name</th>
                            <th className="py-2 px-4 border-r text-left">Email</th>
                            <th className="py-2 px-4 border-r text-left">User Role</th>
                            <th className="py-2 px-4 border-r text-left">Activated</th>
                            <th className="py-2 px-4 border-r text-left">Active</th>
                    
                        </tr>
                    </thead>
                    <tbody className='border'>
                        {users.map((user) => (
                            <tr key={user.id} >
                                <td className="py-4 px-4 border-b"><button  className='px-8 py-2 bg-blue-400 rounded'>view</button></td>
                                <td className="py-4 px-4 border-b">{user.id}</td>
                                <td className="py-4 px-4 border-b">{user.username}</td>
                                <td className="py-4 px-4 border-b">{user.email}</td>
                                <td className="py-4 px-4 border-b">{user.user_role.user_role_name}</td>
                                <td className="py-4 px-4 border-b">{user.is_activated? 'yes' : 'no'}</td>
                                <td className="py-4 px-4 border-b">{user.is_active?'yes':'no'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserAccountListPage;
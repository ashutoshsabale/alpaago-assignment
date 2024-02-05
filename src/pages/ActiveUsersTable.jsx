import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebase/Firebase.jsx';

function Users() {
    const [activeUsers, setActiveUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const firebase = useFirebase();

    console.log("Active user : ", activeUsers);
    console.log("filtered user : ", filteredUsers);

    const fetchData = async() => {
        const usersData = await firebase.fetchDataFromFirestore();
        setActiveUsers(usersData);
        setFilteredUsers(usersData);
    };

    useEffect(()=>{
        fetchData();
    },[])

    const handleDeleteUser = async (userId) => {
        await firebase.deleteUser(userId);
        fetchData();
    };

    const handleChangeStatus = async (userId) => {
        await firebase.toggleUserStatus(userId);
        fetchData();
    };

    const handleSort = (columnName) => {
        let sortedUsers = [...filteredUsers];
        if (sortBy === columnName) {
            sortedUsers.reverse();
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
        sortedUsers.sort((a, b) => {
            if (a[columnName] < b[columnName]) return sortOrder === 'asc' ? -1 : 1;
            if (a[columnName] > b[columnName]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setSortBy(columnName);
        setSortOrder('asc');
        }
        setFilteredUsers(sortedUsers);
    };

    const handleFilter = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        const filtered = activeUsers.filter(user =>
        user.username.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
    };


    const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    const filtered = activeUsers.filter(user => {
        // Convert the user's createdAt to a Date object
        console.log("user.addedDate :", user?.addedDate);
        const milliseconds = user.addedDate.seconds * 1000 + user.addedDate.nanoseconds / 1000000;
        const userCreatedAt = new Date(user.addedDate);
        console.log("userCreatedAt : ", userCreatedAt)
        const userDate = new Date(userCreatedAt);
        // console.log("USer.getTime Date: ", userDate.getTime());
        // console.log("selected.getTime Date: ", selectedDate.getTime());
        // Compare the user's createdAt with the selected date
        return userDate.getTime() === selectedDate.getTime();
    });
    setFilteredUsers(filtered);
};


    return (
        <div className="w-full mx-auto px-24 py-8">
            <div className="flex gap-10 justify-between">
                <input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={handleFilter}
                    className="block w-[500px] px-5 py-3 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                    className="block w-[200px] px-5 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
            </div>
            <table className="mt-8 w-full table-auto">
                <thead className='text-black'>
                    <tr className="bg-gray-200">
                        <th onClick={() => handleSort('username')} className="px-4 py-2 cursor-pointer">Username</th>
                        <th onClick={() => handleSort('addedDate')} className="px-4 py-2 cursor-pointer">Added Date</th>
                        <th onClick={() => handleSort('status')} className="px-4 py-2 cursor-pointer">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center border'>
                    {filteredUsers && filteredUsers?.map(user => (
                        <tr key={user.id} className='hover:bg-gray-700'>
                            <td className="px-4 py-2">{user.username}</td>
                            <td className="px-4 py-2">{new Date(user.addedDate.seconds * 1000 + user.addedDate.nanoseconds / 1000000).toLocaleDateString()}</td>

                            <td className="px-4 py-2">{user.status}</td>
                            <td className="px-4 py-2">
                                <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mr-2">Delete</button>
                                {user && (
                                <button onClick={() => handleChangeStatus(user.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Toggle Status</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;

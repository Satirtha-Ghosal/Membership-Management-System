import '../styles/ManageMember.css'

import { FaSort } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function ManageMembers() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/members/getMembers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                // Await the response.json() since it's a promise
                const data = await response.json();

                if (response.ok) {
                    setData(data)
                    console.log("Members fetched successfully:", data);
                } else {
                    console.error("Error fetching members:", data);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchData();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [entries, setEntries] = useState(5);

    // Search Filter
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, entries)

    // Sorting Function
    const sortTable = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setSortConfig({ key, direction });
        setData(sortedData);
    };

    // Delete Row
    const deleteRow = async(id) => {
        const response = await fetch(`http://localhost:3000/api/members/deleteMember/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(response.ok){
            const newData = data.filter((item) => item._id !== id);
            setData(newData);
        }
        
    };

    // Edit Row (Placeholder Function)
    const editRow = (id) => {
        alert(`Edit row with ID: ${id}`);
    };


    return (
        <>
            <div className="view-type">
                <h2 className="headings">Manage Members</h2>

                <div className="membership-type-list">
                    <h4 className="subheading">Members DataTable</h4>

                    <div className="table-container">
                        <div className="filter-table">
                            <div className="filter">
                            <label>Show Entries: </label>
                            <select className='entry-count' onChange={(e) => setEntries(Number(e.target.value))} value={entries}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value={data.length}>All</option>
                            </select>
                            </div>
                            <div className="filter">
                            <label htmlFor="search-box">Search: </label>
                            <input
                                type="text"
                                placeholder="Search by Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-box "
                            />
                            </div>
                        </div>
                        {
                            data.length<1? <h1>Loading...</h1> :
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        ID <button onClick={() => sortTable("id")}><FaSort /></button>
                                    </th>
                                    <th>
                                        Name <button onClick={() => sortTable("name")}><FaSort /></button>
                                    </th>
                                    <th>
                                        Contact <button onClick={() => sortTable("contact")}><FaSort /></button>
                                    </th>
                                    <th>
                                        Email <button onClick={() => sortTable("email")}><FaSort /></button>
                                    </th>
                                    <th>
                                        Address <button onClick={() => sortTable("address")}><FaSort /></button>
                                    </th>
                                    <th>
                                        Type <button onClick={() => sortTable("type")}><FaSort /></button>
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.contactNumber}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.membershipType}</td>
                                        <td>
                                            <Link to={`/profile/${item._id}`}><button className="view-btn">View</button></Link>
                                            <Link to={`${item._id}`}><button className="edit-btn">Edit</button></Link>
                                            <button className="delete-btn" onClick={() => deleteRow(item._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
}
                    </div>
                </div>
            </div>
        </>
    )
}
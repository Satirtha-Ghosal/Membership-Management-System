import '../styles/ViewType.css'

import { FaSort } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Viewtype() {

    const [data, setData] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/plans/getPlans", {
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
    

    // Search Filter
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
    const deleteRow = async (id) => {
        const response = await fetch(`http://localhost:3000/api/plans/deletePlan/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const newData = data.filter((item) => item._id !== id);
        setData(newData);
    };



    return (
        <>
            <div className="view-type">
                <h2 className="headings">Manage Membership Types</h2>

                <div className="membership-type-list">
                    <h4 className="subheading">Membership Type DataTable</h4>

                    <div className="table-container">
                        <label htmlFor="search-box">Search: </label>
                        <input
                            type="text"
                            placeholder="Search by Type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-box "
                        />

                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        ID <button onClick={() => sortTable("_id")}><FaSort /></button>
                                    </th>
                                    <th>
                                        Type <button onClick={() => sortTable("name")}><FaSort /></button>
                                    </th>
                                    <th>
                                        Amount <button onClick={() => sortTable("amount")}><FaSort /></button>
                                    </th>
                                    <th>
                                        Validity <button onClick={() => sortTable("validity")}><FaSort /></button>
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>${item.amount}</td>
                                        <td>{item.validity}</td>
                                        <td>
                                            <Link to={`../edit-type/${item._id}`}><button className="edit-btn">Edit</button></Link>
                                            <button className="delete-btn" onClick={async () => deleteRow(item._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
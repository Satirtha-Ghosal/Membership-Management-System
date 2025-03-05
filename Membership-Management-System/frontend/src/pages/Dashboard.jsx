import '../styles/Dashboard.css'
import Card from '../components/Cards'
import { IoIosPeople } from "react-icons/io";
import { RiPassExpiredLine } from "react-icons/ri";
import { MdOutlineCardMembership } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import profile from '../assets/profile.png'
import { useState, useEffect } from 'react';

import { NavLink, Link, data } from 'react-router-dom'
import RecentMember from '../components/RecentMember';

export default function Dashboard() {

    const [Members, setMembers] = useState([]);
    const [RecentMembers, setRecentMembers] = useState([]);
    const [Plans, setPlans] = useState([]);
    const [expiredPlans, setExpiredPlans] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)

    useEffect(() => {

        const fetchMemberData = async () => {
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
                    setMembers(data)
                    console.log("Members fetched successfully:", data);
                    let count= 0
                    data.forEach((item)=>{
                        if(new Date()>new Date(item.expiryDate)){
                            count++;
                        }
                    })
                    setExpiredPlans(count)
                } else {
                    console.error("Error fetching members:", data);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        const fetchRecent = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/members/getRecent", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                // Await the response.json() since it's a promise
                const data = await response.json();

                if (response.ok) {
                    setRecentMembers(data)
                    console.log("Members fetched successfully:", data);
                } else {
                    console.error("Error fetching members:", data);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        const fetchPlans = async () => {
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
                    setPlans(data)
                    console.log("Members fetched successfully:", data);
                } else {
                    console.error("Error fetching members:", data);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchMemberData()
        fetchPlans()
        fetchRecent();
    }, []);

    useEffect(()=>{
        let count = 0
        Members.forEach((item)=>{
            count+=Number(Plans.find(plan => plan.name === item.membershipType).amount)
        })

        setTotalRevenue(count)
    },[Plans,Members])


    return (
        <>
            <h2 className='headings'>Dashboard</h2>

            <div className="dashboard-cards">
                <Card logo={<IoIosPeople className='logo-dashboard-card' />} heading="Total Members" count={Members.length}  />
                <Card logo={<MdOutlineCardMembership className='logo-dashboard-card' />} heading="Membership Types" count={Plans.length} />
                <Card logo={<RiPassExpiredLine className='logo-dashboard-card' />} heading="Expired Membership" count={expiredPlans} />
                <Card logo={<FaRupeeSign className='logo-dashboard-card' />} heading="Total Revenue" count={`₹${totalRevenue}`} />
            </div>

            <div className="recent-members">
                <h4 className='subheading'>Recently Joined Members</h4>
                <div className="member-cards">
                    {RecentMembers.map((item) => (
                        <RecentMember img={item.memberPhoto? item.memberPhoto : profile} name={item.name} memNum={item._id} memType={item.membershipType} />
                    ))}
                </div>
                <Link to='../manage-members'>View all Members</Link>
            </div>


        </>
    )
}
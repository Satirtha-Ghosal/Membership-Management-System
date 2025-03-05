import '../styles/MemberProfile.css'
import profile from '../assets/profile.png'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function MemberProfile(){

    const { id } = useParams()
    const [data, setData] = useState()

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/members/getMember/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                // Await the response.json() since it's a promise
                const Data = await response.json();

                if (response.ok) {
                    setData(Data)
                    console.log("Members fetched successfully:", Data);
                } else {
                    console.error("Error fetching members:", Data);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchData();
    },[])

    return(
        <>
            <div className="memberProfile">
            <h2 className="headings">Member Profile</h2>

            <div className="profile-container">
            <h4 className="subheading profile-heading">Member Profile</h4>

            <div className="info-container">
                <div className="info">
                    <div className="info-wrap">
                        <h5 className="feature">Membership ID: </h5>
                        <p className="answer">{data?._id}</p>
                    </div>
                    <div className="info-wrap">
                        <h5 className="feature">Full Name: </h5>
                        <p className="answer">{data?.name}</p>
                    </div>
                    <div className="info-wrap">
                        <h5 className="feature">Date of Birth: </h5>
                        <p className="answer">{data?.dob}</p>
                    </div>
                    <div className="info-wrap">
                        <h5 className="feature">Gender: </h5>
                        <p className="answer">{data?.gender}</p>
                    </div>
                    <div className="info-wrap">
                        <h5 className="feature">Contact Number: </h5>
                        <p className="answer">{data?.contactNumber}</p>
                    </div>
                    <div className="info-wrap">
                        <h5 className="feature">Email: </h5>
                        <p className="answer">{data?.email}</p>
                    </div>
                    <div className="info-wrap">
                        <h5 className="feature">Address: </h5>
                        <p className="answer">{data?.address}</p>
                    </div>
                    <div className="info-wrap">
                        <h5 className="feature">Pincode: </h5>
                        <p className="answer">{data?.pincode}</p>
                    </div>
                    <div className="info-wrap">
                        <h5 className="feature">Membership Type: </h5>
                        <p className="answer">{data?.membershipType}</p>
                    </div>
                    <div className="info-wrap">
                        <h5 className="feature">Status: </h5>
                        <p className="answer">{new Date()<new Date(data?.expiryDate)? "Active": "Expired"}</p>
                    </div>
                </div>
                <div className="img-container">
                    <img src={data?.memberPhoto? data.memberPhoto : profile} alt="" />
                </div>
            </div>
            </div>
            </div>
        </>
    )
}
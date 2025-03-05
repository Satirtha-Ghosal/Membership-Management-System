import '../styles/AddMembership.css'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

import { useParams } from 'react-router-dom';


export default function EditMembership() {

    const { id } = useParams()
    console.log(id)

    const [memberPhoto, setMemberPhoto] = useState("");
    const [oldData, setOldData] = useState([]);
    const [plans, setPlans] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/members/getMember/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                // Await the response.json() since it's a promise
                const oldData = await response.json();

                if (response.ok) {
                    setOldData(oldData)
                    console.log("Members fetched successfully:", oldData);
                } else {
                    console.error("Error fetching members:", oldData);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        const fetchPlans = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/plans/getPlans`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });


                const plans = await response.json();

                if (response.ok) {
                    setPlans(plans)
                    console.log("Members fetched successfully:", plans);
                } else {
                    console.error("Error fetching members:", plans);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchData();
        fetchPlans();
    }, []);

    const handleFileUpload = (event) => {

        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMemberPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    async function handleFormSubmit(e) {
        e.preventDefault()
        console.log("hi")
        const formData = new FormData(e.target)
        const memberData = {
            "name": formData.get('name'),
            "dob": formData.get('dob'),
            "gender": formData.get('gender'),
            "contactNumber": formData.get('contact'),
            "email": formData.get('email'),
            "address": formData.get('address'),
            "pincode": formData.get('pin'),
            "membershipType": formData.get('membership-type'),
            "memberPhoto": memberPhoto
        }


        try {
            const response = await fetch(`http://localhost:3000/api/members/updateMember/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(memberData)
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Member Updated Successfully",
                });
                e.target.reset()
                console.log("Member added successfully:", data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                console.error("Error adding member:", data);
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setMemberPhoto("")
        }
    }


    return (
        <>
            <div className="add-type">
                <h2 className="headings">Update Member</h2>

                <div className="add-membership-type-form">
                    <h4 className="subheading form-heading">Update Members form</h4>
                    <form className='form' onSubmit={handleFormSubmit}>
                        <div className="fields">
                            <div className="field">
                                <label htmlFor="name">Full Name</label>
                                <input className='input-text' type="text" placeholder='Enter your name' name='name' id='name' defaultValue={oldData.name} required />
                            </div>

                            <div className="field">
                                <label htmlFor="dob">Date of Birth</label>
                                <input className='input-text' type="date" name='dob' id='dob' defaultValue={oldData.dob?.split("T")[0]} required />
                            </div>

                            <div className="field">
                                <label htmlFor="gender">Gender</label>
                                <select name="gender" id="gender" className='input-text' defaultValue={oldData.gender} required>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="contact">Contact Number</label>
                                <input className='input-text' type="number" placeholder='Enter your contact number' name='contact' id='contact' defaultValue={oldData.contactNumber} required />
                            </div>

                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input className='input-text' type="email" placeholder='Enter your email' name='email' id='email' defaultValue={oldData.email} required />
                            </div>

                            <div className="field">
                                <label htmlFor="address">Address</label>
                                <input className='input-text' type="text" placeholder='Enter your Address' name='address' id='address' defaultValue={oldData.address} required />
                            </div>

                            <div className="field">
                                <label htmlFor="pin">PinCode</label>
                                <input className='input-text' type="number" placeholder='Enter your pincode' name='pin' id='pin' defaultValue={oldData.pincode} required />
                            </div>

                            <div className="field">
                                <label htmlFor="membership-type">Membership Type</label>
                                <select name="membership-type" id="membership-type" className='input-text' defaultValue={oldData.membershipType} required disabled>
                                    {
                                        plans.map((item) => {
                                            return <option key={item._id} value={item.name}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="photo">Member Photo</label>
                                <input style={{ border: "none" }} type="file" className='input-text' name="photo" id="photo" onChange={handleFileUpload} required />
                            </div>


                        </div>

                        <button className='form-submit-btn' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>

    )

}
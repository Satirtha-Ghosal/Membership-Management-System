import '../styles/AddMembership.css'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

export default function AddMembership() {

    const [memberPhoto, setMemberPhoto] = useState("");
    const [plans, setPlans] = useState([])
    const [amount, setAmount] = useState(0)
    const [expiry, setExpiry] = useState(null)

    function calculateExpiryDate(validityInMonths) {
        const today = new Date();
        console.log("run")

        // Add validity in months to today's date
        today.setMonth(today.getMonth() + validityInMonths);

        // Ensure the date is correctly handled (edge cases like leap years, etc.)
        const expiryDate = new Date(today);

        // Log to see the calculated expiry date
        console.log("Calculated Expiry Date: ", expiryDate);

        // Return the expiry date formatted as yyyy-mm-dd (string format)
        return expiryDate.toISOString().split('T')[0];
    }

    useEffect(() => {
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
                    setAmount(plans[0].amount)
                    setExpiry(calculateExpiryDate(plans[0].validity))
                    console.log("Members fetched successfully:", plans);
                } else {
                    console.error("Error fetching members:", plans);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchPlans()


    }, [])

    const handlePlanSelection = (event) => {
        const selectedPlanName = event.target.value;

        // Find the corresponding plan from the plans array
        const selectedPlanDetails = plans.find(plan => plan.name === selectedPlanName);
        if (selectedPlanDetails) {
            setExpiry(calculateExpiryDate(selectedPlanDetails.validity))
            setAmount(selectedPlanDetails.amount); // Set the amount based on the selected plan
        }
    }

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
            "memberPhoto": memberPhoto,
            "expiryDate": expiry
        }


        try {
            const response = await fetch("http://localhost:3000/api/members/addMember", {
                method: "POST",
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
                    text: "Member Added Successfully",
                  });
                console.log("Member added successfully:", data);
                e.target.reset()
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
                <h2 className="headings">Add Member</h2>

                <div className="add-membership-type-form">
                    <h4 className="subheading form-heading">Add Members form</h4>
                    <form className='form' onSubmit={handleFormSubmit}>
                        <div className="fields">
                            <div className="field">
                                <label htmlFor="name">Full Name</label>
                                <input className='input-text' type="text" placeholder='Enter your name' name='name' id='name' required />
                            </div>

                            <div className="field">
                                <label htmlFor="dob">Date of Birth</label>
                                <input className='input-text' type="date" name='dob' id='dob' required />
                            </div>

                            <div className="field">
                                <label htmlFor="gender">Gender</label>
                                <select name="gender" id="gender" className='input-text' required >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="contact">Contact Number</label>
                                <input className='input-text' type="number" placeholder='Enter your contact number' name='contact' id='contact' required />
                            </div>

                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input className='input-text' type="email" placeholder='Enter your email' name='email' id='email' required />
                            </div>

                            <div className="field">
                                <label htmlFor="address">Address</label>
                                <input className='input-text' type="text" placeholder='Enter your Address' name='address' id='address' required />
                            </div>

                            <div className="field">
                                <label htmlFor="pin">PinCode</label>
                                <input className='input-text' type="number" placeholder='Enter your pincode' name='pin' id='pin' required />
                            </div>

                            <div className="field">
                                <label htmlFor="membership-type">Membership Type</label>
                                <select name="membership-type" id="membership-type" className='input-text' onChange={handlePlanSelection} required >
                                    {
                                        plans.map((item) => {
                                            return <option key={item._id} value={item.name}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="amount">Amount</label>
                                <input className='input-text' type="number" placeholder='Enter your contact number' name='amount' id='amount' value={amount} disabled required />
                            </div>

                            <div className="field">
                                <label htmlFor="photo">Member Photo</label>
                                <input style={{ border: "none" }} type="file" className='input-text' name="photo" id="photo" onChange={handleFileUpload} />
                            </div>


                        </div>

                        <button className='form-submit-btn' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>

    )

}
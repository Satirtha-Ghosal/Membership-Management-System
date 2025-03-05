import '../styles/AddMembership.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2'

export default function RenewalForm() {

    const { id } = useParams()

    const [oldData, setOldData] = useState([]);
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
        fetchData()

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

    async function handleFormSubmit(e) {
        e.preventDefault()
        console.log("hi")
        const formData = new FormData(e.target)
        const memberData = {
            "name": formData.get('name'),
            "membershipType": formData.get('membership-type'),
            "expiryDate": expiry
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
                    text: "Renewed Successfully",
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
        }

        // e.target.reset()
    }


    return (
        <>
            <div className="add-type">
                <h2 className="headings">Renew Membership</h2>

                <div className="add-membership-type-form">
                    <h4 className="subheading form-heading">Renew Membership Form</h4>
                    <form className='form' onSubmit={handleFormSubmit}>
                        <div className="fields">
                            <div className="field">
                                <label htmlFor="name">Full Name</label>
                                <input className='input-text' type="text" placeholder='Enter your name' name='name' id='name' defaultValue={oldData.name} disabled />
                            </div>

                            <div className="field">
                                <label htmlFor="name">ID</label>
                                <input className='input-text' type="text" placeholder='Enter your name' name='name' id='name' defaultValue={oldData._id} disabled />
                            </div>

                            <div className="field">
                                <label htmlFor="membership-type">Membership Type</label>
                                <select name="membership-type" id="membership-type" className='input-text' onChange={handlePlanSelection} defaultValue={oldData.membershipType}>
                                    {
                                        plans.map((item) => {
                                            return <option key={item._id} value={item.name}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="amount">Amount</label>
                                <input className='input-text' type="number" placeholder='Enter your contact number' name='amount' id='amount' value={amount} disabled />
                            </div>


                        </div>

                        <button className='form-submit-btn' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>

    )

}
import '../styles/AddType.css'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';

export default function EditType() {

    const { id } = useParams()

    const [oldData, setOldData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/plans/getPlan/${id}`, {
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
        fetchData();
    }, []);

    async function handleFormSubmit(e) {
        e.preventDefault()
        console.log("hi")
        const formData = new FormData(e.target)

        const PlanData = {
            "name": formData.get('type-name'),
            "amount": formData.get('type-amt'),
            "validity": formData.get('validity')
        }


        try {
            const response = await fetch(`http://localhost:3000/api/plans/updatePlan/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(PlanData)
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Plan Updated Successfully",
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
    }


    return (
        <>
            <div className="add-type">
                <h2 className="headings">Update Membership Type</h2>

                <div className="add-membership-type-form">
                    <h4 className="subheading form-heading">Update Membership Type form</h4>
                    <form className='form' onSubmit={handleFormSubmit}>
                        <div className="fields">
                            <div className="field">
                                <label htmlFor="type-name">Membership Type</label>
                                <input className='input-text' type="text" placeholder='Enter membership type' name='type-name' id='type-name' defaultValue={oldData.name} required />
                            </div>
                            <div className="field">
                                <label htmlFor="type-amt">Amount</label>
                                <input className='input-text' type="text" placeholder='Enter membership type amount' name='type-amt' id='type-amt' defaultValue={oldData.amount} required />
                            </div>
                            <div className="field">
                                <label htmlFor="type-name">Validity (Months)</label>
                                <input className='input-text' type="text" placeholder='Enter membership type' name='validity' id='validity' defaultValue={oldData.validity} required />
                            </div>
                        </div>

                        <button className='form-submit-btn' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
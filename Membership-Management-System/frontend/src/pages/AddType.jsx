import '../styles/AddType.css'
import Swal from 'sweetalert2'

export default function AddType() {


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
      const response = await fetch("http://localhost:3000/api/plans/addPlan", {
        method: "POST",
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
          text: "Plan Added Successfully",
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
        <h2 className="headings">Add Membership Type</h2>

        <div className="add-membership-type-form">
          <h4 className="subheading form-heading">Add Membership Type form</h4>
          <form className='form' onSubmit={handleFormSubmit}>
            <div className="fields">
              <div className="field">
                <label htmlFor="type-name">Membership Type</label>
                <input className='input-text' type="text" placeholder='Enter membership type' name='type-name' id='type-name' required />
              </div>
              <div className="field">
                <label htmlFor="type-amt">Amount</label>
                <input className='input-text' type="text" placeholder='Enter membership type amount' name='type-amt' id='type-amt' required />
              </div>
              <div className="field">
                <label htmlFor="type-name">Validity (Months)</label>
                <input className='input-text' type="text" placeholder='Enter membership type' name='validity' id='validity' required />
              </div>
            </div>

            <button className='form-submit-btn' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}
import React, { useState } from "react";

const today = new Date().toLocaleDateString("en-CA");

export const Contact = () => {
  const [error, setError] = useState({});
  const [customForm, setCustomForm] = useState({
    Fullname: "",
    Email: "",
    Phone: "",
    Destination: "",
    Date: "",
    Nooftraveller: "",
    Tourtype: "",
    Budget: "",
  });

  const handlecustomform = (e) => {
    const { name, value } = e.target;
    const clean =
      name === "Phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setCustomForm((prev) => ({ ...prev, [name]: clean }));
    if (error[name]) setError((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    const v = customForm;

    if (!v.Fullname.trim()) e.Fullname = "Enter your full name";
    else if (v.Fullname.trim().length < 3) e.Fullname = "Enter at least 3 characters";

    if (!v.Email.trim()) e.Email = "Enter your email address";
    else if (!/^\S+@\S+\.\S+$/.test(v.Email)) e.Email = "Enter a valid email address";

    if (!v.Phone) e.Phone = "Enter your phone number";
    else if (!/^[6-9]\d{9}$/.test(v.Phone)) e.Phone = "Enter a valid 10 digit mobile number";

    if (!v.Destination) e.Destination = "Select your destination";

    if (!v.Date) e.Date = "Select your travel date";
    else if (v.Date < today) e.Date = "Date cannot be in the past";

    const n = Number(v.Nooftraveller);
    if (!v.Nooftraveller) e.Nooftraveller = "Enter number of travellers";
    else if (!Number.isInteger(n) || n < 1 || n > 50) e.Nooftraveller = "Enter between 1 and 50 travellers";

    if (!v.Tourtype) e.Tourtype = "Select tour type";
    if (!v.Budget) e.Budget = "Select your budget";

    return e;
  };

  // FIX: naam camelCase kiya (HandleSubmit -> handleSubmit)
  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setError(v);
    if (Object.keys(v).length > 0) return;
    console.log(customForm); 
  };

  return (
    <>
      <div className="container text-center section-padding">
        <section>
          <div className="text-center mb-5">
            <h2>Let's Plan Your Perfect Trip</h2>
            <p className="text-muted">
              Have a question, a dream destination, or a custom itinerary in
              mind? Tell us, and our travel experts will get back to you within
              24 hours.
            </p>
            <div className="row section-padding">
              <div className="col-md-6">
                <div className="call-us">
                  <h2>Contact Us</h2>
                  <p>+91 888888899990</p>
                  <p>Mon – Sat, 9:00 AM – 7:00 PM</p>
                </div>
                <div className="email-us">
                  <h2>Email Us</h2>
                  <p>hello@tripzo.com</p>
                  <p>We reply within 24 hours</p>
                </div>
                <div className="visit-us">
                  <h2>Address</h2>
                  <p>We reply within 24 hours.We reply within 24 hours</p>
                </div>
              </div>
              <div className="col-md-6 g-3">
                {/* form start here */}
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="custom-tour-contact-form text-start"
                >
                  <label htmlFor="Fullname" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="Fullname"
                    name="Fullname"
                    type="text"
                    className={`form-control ${error.Fullname ? "is-invalid" : ""}`}
                    placeholder="Enter your full name"
                    value={customForm.Fullname}
                    onChange={handlecustomform}
                  />
                  <div className="invalid-feedback">{error.Fullname}</div>

                  <label htmlFor="Email" className="form-label mt-3">
                    Email Address
                  </label>
                  <input
                    id="Email"
                    name="Email"
                    type="email"
                    className={`form-control ${error.Email ? "is-invalid" : ""}`}
                    placeholder="Enter your email address"
                    value={customForm.Email}
                    onChange={handlecustomform}
                  />
                  <div className="invalid-feedback">{error.Email}</div>

                  <label htmlFor="Phone" className="form-label mt-3">
                    Phone No.
                  </label>
                  <input
                    id="Phone"
                    name="Phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    className={`form-control ${error.Phone ? "is-invalid" : ""}`}
                    placeholder="Enter 10 digit mobile number"
                    value={customForm.Phone}
                    onChange={handlecustomform}
                  />
                  <div className="invalid-feedback">{error.Phone}</div>

                  <label htmlFor="Destination" className="form-label mt-3">
                    Destination
                  </label>
                  <select
                    id="Destination"
                    name="Destination"
                    className={`form-select ${error.Destination ? "is-invalid" : ""}`}
                    value={customForm.Destination}
                    onChange={handlecustomform}
                  >
                    <option value="">Select destination</option>
                    <option>Rajasthan</option>
                    <option>Goa</option>
                    <option>Kerala</option>
                    <option>Himachal Pradesh</option>
                    <option>Uttarakhand</option>
                    <option>Ladakh</option>
                    <option>Kashmir</option>
                    <option>Andaman & Nicobar</option>
                    <option>Other Destination/ Custom</option>
                  </select>
                  <div className="invalid-feedback">{error.Destination}</div>

                  <label htmlFor="Date" className="form-label mt-3">
                    Travel Date
                  </label>
                  <input
                    id="Date"
                    name="Date"
                    type="date"
                    min={today}
                    className={`form-control ${error.Date ? "is-invalid" : ""}`}
                    value={customForm.Date}
                    onChange={handlecustomform}
                  />
                  <div className="invalid-feedback">{error.Date}</div>

                  <label htmlFor="Nooftraveller" className="form-label mt-3">
                    No. of Travellers
                  </label>
                  <input
                    id="Nooftraveller"
                    name="Nooftraveller"
                    type="number"
                    min="1"
                    max="50"
                    className={`form-control ${error.Nooftraveller ? "is-invalid" : ""}`}
                    value={customForm.Nooftraveller}
                    onChange={handlecustomform}
                  />
                  <div className="invalid-feedback">{error.Nooftraveller}</div>

                  <label htmlFor="Tourtype" className="form-label mt-3">
                    Tour Type
                  </label>
                  <select
                    id="Tourtype"
                    name="Tourtype"
                    className={`form-select ${error.Tourtype ? "is-invalid" : ""}`}
                    value={customForm.Tourtype}
                    onChange={handlecustomform}
                  >
                    <option value="">Select tour type</option>
                    <option>Adventure</option>
                    <option>Beach</option>
                    <option>Cultural</option>
                    <option>Family</option>
                    <option>Luxury</option>
                    <option>Custom</option>
                  </select>
                  <div className="invalid-feedback">{error.Tourtype}</div>

                  <label htmlFor="Budget" className="form-label mt-3">
                    Budget (per person)
                  </label>
                  <select
                    id="Budget"
                    name="Budget"
                    className={`form-select ${error.Budget ? "is-invalid" : ""}`}
                    value={customForm.Budget}
                    onChange={handlecustomform}
                  >
                    <option value="">Select budget</option>
                    <option>Under ₹10,000</option>
                    <option>₹10,000 – ₹25,000</option>
                    <option>₹25,000 – ₹50,000</option>
                    <option>₹50,000+</option>
                  </select>
                  <div className="invalid-feedback">{error.Budget}</div>

                  <button type="submit" className="btn-tripzo mt-4 w-100">
                    Send Enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
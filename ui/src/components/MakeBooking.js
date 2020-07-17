import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import "../styles/makeBooking.css";

export default function MakeBooking({
  barbers,
  timeSlotsForCurrentDate,
  createNewBooking,
  location,
  t
}) {
  const {
    state: { barber },
  } = useLocation();

  const { businessDate, timeSlot } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const newBooking = {
      businessDate,
      timeSlot: timeSlot.slice(0, 2) + timeSlot.slice(3),
      customer: {
        firstName,
        lastName,
        email,
        mobile,
      },
      barber: {
        firstName: barber.firstName,
        lastName: barber.lastName,
        id: barber.id,
      },
    };

    createNewBooking(newBooking);
  };

  return (
    <div className="container make-booking ">
      <h2 className="page-title">{t("Make a Booking")}</h2>
      <div className="booking-details">
        <h4>
          <span className="booking-details-label">{t("Date")}:</span> {businessDate}
        </h4>
        <h4>
          <span className="booking-details-label">{t("Time")}:</span> {timeSlot}
        </h4>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <h4 className="booking-form-title">
          {t("Please fill following information to reserve your spot")}
        </h4>
        <label htmlFor="firstName">
          <span className="form-label">{t("First Name")}:</span>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="lastName">
          <span className="form-label">{t("Last Name")}:</span>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="email">
          <span className="form-label">E-mail:</span>
          <input
            type="email"
            id="email"
            name="mobile"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label htmlFor="mobile">
          <span className="form-label">{t("Mobile")}:</span>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </label>
        <div className="submit-wrapper">
          <input type="submit" value={t("Submit")} />
        </div>
      </form>
    </div>
  );
}

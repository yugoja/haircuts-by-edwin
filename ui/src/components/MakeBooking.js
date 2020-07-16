import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/makeBooking.css";

export default function MakeBooking({
  barbers,
  timeSlotsForCurrentDate,
  createNewBooking,
}) {
  const { businessDate, timeSlot } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const existingBookingsForSelectedTimeSlot = timeSlotsForCurrentDate.filter(
      (ts) => ts.timeSlot === timeSlot
    )[0];

    const BarbersToAssign = barbers.filter((barber) => {
      const indexOfBarber = existingBookingsForSelectedTimeSlot.bookings.findIndex(
        (booking) => {
          if (Object.keys(booking).length === 0 && booking.constructor === Object) {
            return false;
          }
          return booking.barber.id === barber.id;
        }
      );

      return indexOfBarber === -1 ? true : false;
    });

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
        id: BarbersToAssign[0].id,
        firstName: BarbersToAssign[0].firstName,
        lastName: BarbersToAssign[0].lastName,
      },
    };

    createNewBooking(newBooking);
  };

  return (
    <div className="container make-booking ">
      <h2>Make a Booking</h2>
      <div className="booking-details">
        <h4>
          <span className="booking-details-label">Date:</span> {businessDate}
        </h4>
        <h4>
          <span className="booking-details-label">Time:</span> {timeSlot}
        </h4>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <h4 className="booking-form-title">Please fill following details to reserve your spot</h4>
        <label htmlFor="firstName">
          <span className="form-label">First Name:</span>
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
          <span className="form-label">Last Name:</span>
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
          <span className="form-label">Email:</span>
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
          <span className="form-label">Mobile:</span>
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
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

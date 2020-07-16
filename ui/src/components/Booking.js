import React from "react";
import Calendar from "react-calendar";

import "../styles/booking.css";

export default function Booking({
  currentDate,
  timeSlotsForCurrentDate,
  dateFormatOptions,
  onClickDay,
}) {
  return (
    <div className="container booking-container">
      <div className="booking-siderbar">
        <Calendar onClickDay={onClickDay} value={currentDate} />
      </div>
      <div className="booking-slot-container">
        <h2 className="booking-grid-title">
          {currentDate.toLocaleDateString("en-US", dateFormatOptions)}
        </h2>
        <div className="booking-slots-grid">
          <ul>
            <li className="booking-grid__time-slot-row">
              <div className="booking-grid__time-slot-title">Time Slot</div>
              <div className="booking-grid__barber">Barber 1</div>
              <div className="booking-grid__barber">Barber 2</div>
              <div className="booking-grid__barber">Barber 3</div>
            </li>
            {timeSlotsForCurrentDate.map((ts, index) => {
              return (
                <li key={index} className="booking-grid__time-slot-row">
                  <div className="booking-grid__time-slot">{ts.timeSlot}</div>
                  {ts.bookings.map((booking, idx) => {
                    return Object.keys(booking).length === 0 &&
                      booking.constructor === Object ? (
                      <div className="booking open-slot" key={idx}>
                        <div>
                          <button>Book</button>
                        </div>
                      </div>
                    ) : (
                      <div className="booking booked-slot" key={idx}>
                        <div>Booked</div>
                      </div>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";

import { formatDate } from "../util/util";

import "../styles/booking.css";

export default function BookingGrid({
  currentDate,
  timeSlotsForCurrentDate,
  dateFormatOptions,
  barbers,
  onClickDay,
  handleBarberFilterChange,
}) {
  return (
    <div className="container booking-container">
      <div className="booking-siderbar">
        <Calendar onClickDay={onClickDay} value={currentDate} />
        <div className="barber-filter">
          <h3>Barber Filter</h3>
          <ul className="barber-list">
            {barbers.map((barber, barberIndex) => (
              <li key={barberIndex}>
                <label htmlFor={barber.id}>
                  <input
                    type="checkbox"
                    name={barber.id}
                    id={barber.id}
                    checked={barber.selected}
                    onChange={() => handleBarberFilterChange(barberIndex)}
                  />
                  {barber.firstName} {barber.lastName}
                </label>
                (⭐ {barber.ratings})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="booking-slot-container">
        <h2 className="booking-grid-title">
          {currentDate.toLocaleDateString("en-US", dateFormatOptions)}
        </h2>
        <div className="booking-slots-grid">
          <ul>
            <li className="booking-grid__time-slot-row">
              <div className="booking-grid__time-slot-title">Time Slot</div>
              {barbers
                .filter((barber) => barber.selected)
                .map((barber) => (
                  <div key={barber.id} className="booking-grid__barber">
                    {barber.firstName} {barber.lastName}
                  </div>
                ))}
            </li>
            {timeSlotsForCurrentDate.map((ts, index) => {
              return (
                <li key={index} className="booking-grid__time-slot-row">
                  <div className="booking-grid__time-slot">{ts.timeSlot}</div>
                  {ts.bookings
                    .filter((booking, index) => barbers[index].selected)
                    .map((booking, idx) => {
                      return Object.keys(booking.customer).length === 0 &&
                        booking.customer.constructor === Object ? (
                        <div className="booking open-slot" key={idx}>
                          <div>
                            <Link
                              className="booking-slot__link"
                              to={{
                                pathname: `/make-booking/${formatDate(currentDate)}/${
                                  ts.timeSlot
                                }`,
                                state: { barber: booking.barber },
                              }}
                            >
                              Book
                            </Link>
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

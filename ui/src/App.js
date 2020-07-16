import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

import Header from "./components/Header";
import Booking from "./components/Booking";
import { formatDate } from "./util/util";

import "./App.css";

class App extends React.Component {
  state = {
    currentDate: new Date(),
    dateFormatOptions: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    timeSlotsForCurrentDate: [],
  };

  componentDidMount() {
    this.loadBookingLog(this.state.currentDate);
  }

  loadBookingLog = (businessDate) => {
    const specifiedDate = formatDate(businessDate);

    fetch(`http://localhost:8080/booking-log?businessDate=${specifiedDate}`)
      .then((resp) => resp.json())
      .then((data) => {
        this.prepareBookingSlotsData(businessDate, data.timeSlots);
      });
  };

  onClickDay = (newDate, e) => {
    this.setState(
      {
        ...this.state,
        currentDate: new Date(newDate),
      },
      () => this.loadBookingLog(this.state.currentDate)
    );
  };

  prepareBookingSlotsData = (businessDate, timeSlotsWithExistingBookings) => {
    const WeekdayTimeSlots = [
      "0900",
      "0930",
      "1000",
      "1030",
      "1100",
      "1130",
      "1200",
      "1230",
      "1300",
      "1330",
      "1400",
      "1430",
      "1500",
      "1530",
      "1600",
      "1630",
    ];
    const WeekendTimeSlots = [
      "1200",
      "1230",
      "1300",
      "1330",
      "1400",
      "1430",
      "1500",
      "1530",
    ];

    const bookingsForTimeSlot = ["booking1", "booking3", "booking3"];

    const dayOfBusinessDate = new Date(businessDate).getDay();
    const isBusinessDateWeekend = dayOfBusinessDate === 6 || dayOfBusinessDate === 0;
    const availableBookingTimeSlots = isBusinessDateWeekend
      ? WeekendTimeSlots
      : WeekdayTimeSlots;

    timeSlotsWithExistingBookings =
      timeSlotsWithExistingBookings === null ? [] : timeSlotsWithExistingBookings;

    const timeSlotsForCurrentDate = availableBookingTimeSlots.map((timeSlot) => {
      const enrichedTimeSlot = {};
      const bookedTimeSlotIndex = timeSlotsWithExistingBookings.findIndex(
        (ts) => ts.timeSlot === timeSlot
      );

      enrichedTimeSlot.timeSlot = timeSlot.slice(0, 2) + ":" + timeSlot.slice(2);
      enrichedTimeSlot.bookings =
        bookedTimeSlotIndex !== -1
          ? timeSlotsWithExistingBookings[bookedTimeSlotIndex].bookings
          : [];

      bookingsForTimeSlot.forEach((booking, index) => {
        if (enrichedTimeSlot.bookings[index] == null) {
          enrichedTimeSlot.bookings.push({});
        }
      });

      return enrichedTimeSlot;
    });

    this.setState({
      ...this.state,
      timeSlotsForCurrentDate: [...timeSlotsForCurrentDate],
    });
  };

  render() {
    return (
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
            <Booking
              currentDate={this.state.currentDate}
              dateFormatOptions={this.state.dateFormatOptions}
              timeSlotsForCurrentDate={this.state.timeSlotsForCurrentDate}
              onClickDay={this.onClickDay}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;

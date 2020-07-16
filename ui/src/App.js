import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

import Header from "./components/Header";
import BookingGrid from "./components/BookingGrid";
import MakeBooking from "./components/MakeBooking";
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
    barbers: [],
  };

  constructor(props) {
    super(props);

    this.props = props;
  }

  componentDidMount() {
    this.loadBookingLog(this.state.currentDate);
    this.loadBarbers();
  }

  loadBookingLog = (businessDate) => {
    const specifiedDate = formatDate(businessDate);

    return fetch(`http://localhost:8080/booking-log?businessDate=${specifiedDate}`)
      .then((resp) => resp.json())
      .then((data) => {
        this.prepareBookingSlotsData(businessDate, data.timeSlots);
      })
      .catch((e) => console.error(e));
  };

  loadBarbers = () => {
    fetch(`http://localhost:8080/barbers`)
      .then((resp) => resp.json())
      .then((barbersData) =>
        this.setState({
          ...this.state,
          barbers: [...barbersData],
        })
      )
      .catch((e) => console.error(e));
  };

  createNewBooking = (newBooking) => {
    fetch(`http://localhost:8080/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    })
      .then((resp) => resp.json())
      .then((updateTimeSlotsForCurrentDate) => {
        return this.loadBookingLog(this.state.currentDate);
      })
      .then(() => this.props.history.push("/"))
      .catch((e) => console.error(e));
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
            <BookingGrid
              currentDate={this.state.currentDate}
              dateFormatOptions={this.state.dateFormatOptions}
              timeSlotsForCurrentDate={this.state.timeSlotsForCurrentDate}
              onClickDay={this.onClickDay}
            />
          </Route>
          <Route path="/make-booking/:businessDate/:timeSlot">
            <MakeBooking
              barbers={this.state.barbers}
              timeSlotsForCurrentDate={this.state.timeSlotsForCurrentDate}
              createNewBooking={this.createNewBooking}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

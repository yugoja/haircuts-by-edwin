import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { withTranslation, Trans } from "react-i18next";

import Header from "./components/Header";
import BookingGrid from "./components/BookingGrid";
import MakeBooking from "./components/MakeBooking";
import Admin from "./components/Admin";

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
    currentLanguage: "en",
  };

  constructor(props) {
    super(props);

    this.props = props;
    console.log(props);
  }

  componentDidMount() {
    this.loadBarbers().then(() => this.loadBookingLog(this.state.currentDate));
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
    return fetch(`http://localhost:8080/barbers`)
      .then((resp) => resp.json())
      .then((barbersData) => {
        barbersData.sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings));

        barbersData.forEach((barber) => (barber.selected = true));

        console.log(barbersData);
        this.setState({
          ...this.state,
          barbers: [...barbersData],
        });
      })
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

    // Prepare total timeslots based on if business day is weekend or weekday
    const dayOfBusinessDate = new Date(businessDate).getDay();
    const isBusinessDateWeekend = dayOfBusinessDate === 6 || dayOfBusinessDate === 0;
    const availableBookingTimeSlots = isBusinessDateWeekend
      ? WeekendTimeSlots
      : WeekdayTimeSlots;

    timeSlotsWithExistingBookings =
      timeSlotsWithExistingBookings === null ? [] : timeSlotsWithExistingBookings;

    const timeSlotsForCurrentDate = availableBookingTimeSlots.map((timeSlot) => {
      const enrichedTimeSlot = {};

      enrichedTimeSlot.timeSlot = timeSlot.slice(0, 2) + ":" + timeSlot.slice(2);

      const bookedTimeSlotIndex = timeSlotsWithExistingBookings.findIndex(
        (ts) => ts.timeSlot === timeSlot
      );

      const unsortedBookings =
        bookedTimeSlotIndex !== -1
          ? timeSlotsWithExistingBookings[bookedTimeSlotIndex].bookings
          : [];

      bookingsForTimeSlot.forEach((booking, index) => {
        if (unsortedBookings[index] == null) {
          unsortedBookings.push({});
        }
      });

      enrichedTimeSlot.bookings = this.state.barbers.map((barber) => {
        const indexOfBarber = unsortedBookings.findIndex((booking) => {
          if (Object.keys(booking).length === 0 && booking.constructor === Object) {
            return false;
          }
          return booking.barber.id === barber.id;
        });

        if (indexOfBarber !== -1) {
          return unsortedBookings[indexOfBarber];
        } else {
          return {
            barber,
            customer: {},
          };
        }
      });

      return enrichedTimeSlot;
    });

    this.setState({
      ...this.state,
      timeSlotsForCurrentDate: [...timeSlotsForCurrentDate],
    });
  };

  handleBarberFilterChange = (barberIndex) => {
    this.setState({
      ...this.state,
      barbers: [
        ...this.state.barbers.slice(0, barberIndex),
        {
          ...this.state.barbers[barberIndex],
          selected: !this.state.barbers[barberIndex].selected,
        },
        ...this.state.barbers.slice(barberIndex + 1),
      ],
    });
  };

  handleLanguageChange = (event) => {
    this.setState({
      ...this.state,
      currentLanguage: event.target.value,
    });

    this.props.i18n.changeLanguage(event.target.value);
  };

  render() {
    return (
      <div className="App">
        <Header
          t={this.props.t}
          currentLanguage={this.state.currentLanguage}
          handleLanguageChange={this.handleLanguageChange}
        />

        <Switch>
          <Route exact path="/">
            <BookingGrid
              currentDate={this.state.currentDate}
              dateFormatOptions={this.state.dateFormatOptions}
              timeSlotsForCurrentDate={this.state.timeSlotsForCurrentDate}
              barbers={this.state.barbers}
              onClickDay={this.onClickDay}
              handleBarberFilterChange={this.handleBarberFilterChange}
              t={this.props.t}
              currentLanguage={this.state.currentLanguage}
            />
          </Route>

          <Route path="/make-booking/:businessDate/:timeSlot">
            <MakeBooking
              barbers={this.state.barbers}
              timeSlotsForCurrentDate={this.state.timeSlotsForCurrentDate}
              createNewBooking={this.createNewBooking}
              t={this.props.t}
            />
          </Route>

          <Route extact path="/admin">
            <Admin
              barbers={this.state.barbers}
              loadBarbers={this.loadBarbers}
              t={this.props.t}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withTranslation("translations")(withRouter(App));

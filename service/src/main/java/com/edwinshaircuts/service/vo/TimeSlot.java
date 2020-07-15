package com.edwinshaircuts.service.vo;

import java.util.List;

public class TimeSlot {
    private String timeSlot;
    private List<Booking> bookings;

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }
}

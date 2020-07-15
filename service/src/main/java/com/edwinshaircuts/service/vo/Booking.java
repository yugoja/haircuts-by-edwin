package com.edwinshaircuts.service.vo;

import org.bson.types.ObjectId;

public class Booking {
    private ObjectId bookingId;
    private Customer customer;
    private Barber barber;

    public Booking() {
        this.bookingId = new ObjectId();
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Barber getBarber() {
        return barber;
    }

    public void setBarber(Barber barber) {
        this.barber = barber;
    }

    public ObjectId getBookingId() {
        return bookingId;
    }

    public void setBookingId(ObjectId bookingId) {
        this.bookingId = bookingId;
    }
}

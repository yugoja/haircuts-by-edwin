package com.edwinshaircuts.service.controllers;

import com.edwinshaircuts.service.services.BookingLogServiceImpl;
import com.edwinshaircuts.service.vo.BookingLog;
import com.edwinshaircuts.service.vo.NewBooking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class BookingLogController {
    @Autowired
    BookingLogServiceImpl bookingLogService;

    @GetMapping("/booking-log")
    public BookingLog getBookingLogsByFirstName(@RequestParam(value = "businessDate", defaultValue = "")  String businessDate) {
        return bookingLogService.getBookingLog(businessDate);
    }

    @PostMapping("/book")
    public BookingLog bookBookingLog(@RequestBody NewBooking newBooking) {
        return bookingLogService.upsertBookingLog(newBooking);
    }
}
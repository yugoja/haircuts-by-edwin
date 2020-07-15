package com.edwinshaircuts.service.services;

import com.edwinshaircuts.service.vo.BookingLog;
import com.edwinshaircuts.service.vo.NewBooking;

public interface BookingLogService {
    BookingLog getBookingLog(String businessDate);

    BookingLog upsertBookingLog(NewBooking newBooking);
}

package com.edwinshaircuts.service.repositoy;

import com.edwinshaircuts.service.vo.BookingLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface BookingLogRepository extends MongoRepository<BookingLog, String>{
    @Query("{ 'businessDate' : ?0 }")
    BookingLog findBookingLogByDate(String date);

    @Query("{'businessDate' : ?0, 'bookings.timeSlot': ?1 }")
    BookingLog findSlotDetailsByDateAndTime(String date, String timeSlot);
}

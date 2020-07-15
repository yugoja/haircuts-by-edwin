package com.edwinshaircuts.service.services;

import com.edwinshaircuts.service.repositoy.BookingLogRepository;
import com.edwinshaircuts.service.vo.Booking;
import com.edwinshaircuts.service.vo.BookingLog;
import com.edwinshaircuts.service.vo.TimeSlot;
import com.edwinshaircuts.service.vo.NewBooking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BookingLogServiceImpl implements BookingLogService{
    private final static Integer bookingsPerSlot = 3;
    private final static List<String> weekdayTimeSlots = Arrays.asList(new String[]{"0900", "0930", "1000", "1030", "1100", "1130", "1200", "1230", "1300", "1330", "1400", "1430", "1500", "1530", "1600", "1630"});
    private final static List<String> weekendTimeSlots = Arrays.asList(new String[]{"1200", "1230", "1300", "1330", "1400", "1430", "1500", "1530"});

    @Autowired
    BookingLogRepository bookingLogRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public BookingLog getBookingLog(String businessDate) {
        BookingLog bookingLogForSpecifiedDate = bookingLogRepository.findBookingLogByDate(businessDate);

        if(bookingLogForSpecifiedDate == null) {
            BookingLog newBookingLog = new BookingLog();

            newBookingLog.setBusinessDate(businessDate);

            return newBookingLog;
        } else {
            return bookingLogRepository.findBookingLogByDate(businessDate);
        }
    }

    @Override
    public BookingLog upsertBookingLog(NewBooking newBooking) {
        Boolean isWeekend = isDateOnWeekend(newBooking.getBusinessDate());

        if(
            (isWeekend && !weekendTimeSlots.contains(newBooking.getTimeSlot())) ||
            (!isWeekend && !weekdayTimeSlots.contains(newBooking.getTimeSlot()))
        ) {
            return null;
        }

        BookingLog bookingLogForSpecifiedDay = bookingLogRepository.findBookingLogByDate(newBooking.getBusinessDate());

        if(bookingLogForSpecifiedDay == null) {
            Booking booking = new Booking();
            booking.setBarber(newBooking.getBarber());
            booking.setCustomer(newBooking.getCustomer());

            List<Booking> bookings = new ArrayList<>();
            bookings.add(booking);

            TimeSlot timeSlot = new TimeSlot();
            timeSlot.setTimeSlot(newBooking.getTimeSlot());
            timeSlot.setBookings(bookings);

            List<TimeSlot> TimeSlots = new ArrayList<>();
            TimeSlots.add(timeSlot);

            bookingLogForSpecifiedDay = new BookingLog();
            bookingLogForSpecifiedDay.setBusinessDate(newBooking.getBusinessDate());
            bookingLogForSpecifiedDay.setTimeSlots(TimeSlots);

            return bookingLogRepository.insert(bookingLogForSpecifiedDay);
        } else {
            TimeSlot existingTimeSlot = bookingLogForSpecifiedDay
                .getTimeSlots()
                .stream()
                .filter(b -> newBooking.getTimeSlot().equals(b.getTimeSlot()))
                .findFirst()
                .orElse(null);

            if (existingTimeSlot == null) {
                Booking booking = new Booking();
                booking.setCustomer(newBooking.getCustomer());
                booking.setBarber(newBooking.getBarber());

                List<Booking> bookings = new ArrayList<>();
                bookings.add(booking);

                TimeSlot newTimeSlot = new TimeSlot();
                newTimeSlot.setTimeSlot(newBooking.getTimeSlot());
                newTimeSlot.setBookings(bookings);

                Query addTimeSlotQuery = new Query(Criteria.where("businessDate").is(newBooking.getBusinessDate()));
                Update addTimeSlotUpdate = new Update().push("timeSlots", newTimeSlot);

                mongoTemplate.findAndModify(addTimeSlotQuery, addTimeSlotUpdate, BookingLog.class);
            } else if(existingTimeSlot.getBookings().size() < bookingsPerSlot) {
                Booking booking = new Booking();
                booking.setCustomer(newBooking.getCustomer());
                booking.setBarber(newBooking.getBarber());

                Query query = new Query(
                    new Criteria().andOperator(
                        Criteria.where("businessDate").is(newBooking.getBusinessDate()),
                        Criteria.where("timeSlots").elemMatch(Criteria.where("timeSlot").is(newBooking.getTimeSlot()))
                    )
                );
                Update update = new Update().push("timeSlots.$.bookings", booking);

                mongoTemplate.findAndModify(query, update, BookingLog.class);
            }

            return new BookingLog();
        }
    }

    private Boolean isDateOnWeekend(String date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date parseDate = null;
        try {
            parseDate = dateFormat.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(parseDate);

        return calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY || calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY;
    }
}

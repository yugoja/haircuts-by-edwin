package com.edwinshaircuts.service.controllers;

import com.edwinshaircuts.service.services.BarberServiceImpl;
import com.edwinshaircuts.service.vo.Barber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BarberController {
    @Autowired
    BarberServiceImpl barberService;
    @GetMapping("/barbers")
    List<Barber> getBarbers() {
        return barberService.getBarbers();
    }
}

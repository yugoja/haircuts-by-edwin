package com.edwinshaircuts.service.controllers;

import com.edwinshaircuts.service.services.AdminService;
import com.edwinshaircuts.service.services.AdminServiceImpl;
import com.edwinshaircuts.service.vo.MonthlyStatistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    @Autowired
    AdminServiceImpl adminService;

    @GetMapping("/monthly-stats")
    List<MonthlyStatistics> getMonthWiseStatistics() {
        return adminService.getMonthWiseStatistics();
    }
}

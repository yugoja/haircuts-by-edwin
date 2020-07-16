package com.edwinshaircuts.service.services;

import com.edwinshaircuts.service.vo.MonthlyStatistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

public interface AdminService {
    List<MonthlyStatistics> getMonthWiseStatistics();
}

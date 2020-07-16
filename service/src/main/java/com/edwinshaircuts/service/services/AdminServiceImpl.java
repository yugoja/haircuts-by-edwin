package com.edwinshaircuts.service.services;

import com.edwinshaircuts.service.vo.MonthlyStatistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{
    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<MonthlyStatistics> getMonthWiseStatistics() {
        return mongoTemplate.findAll(MonthlyStatistics.class);
    }
}

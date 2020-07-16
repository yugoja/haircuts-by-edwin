package com.edwinshaircuts.service.services;

import com.edwinshaircuts.service.vo.Barber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BarberServiceImpl implements BarberService{
    @Autowired
    MongoTemplate mongoTemplate;


    @Override
    public List<Barber> getBarbers() {
        return mongoTemplate.findAll(Barber.class);
    }
}

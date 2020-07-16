package com.edwinshaircuts.service.vo;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "monthlystats")
public class MonthlyStatistics {
    private String month;
    private String year;
    List<Object> stats;

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public List<Object> getStats() {
        return stats;
    }

    public void setStats(List<Object> stats) {
        this.stats = stats;
    }
}

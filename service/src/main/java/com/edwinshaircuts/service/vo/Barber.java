package com.edwinshaircuts.service.vo;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "barbers")
public class Barber {
    private String id;
    private String firstName;
    private String lastName;
    private String ratings;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRatings() {
        return ratings;
    }

    public void setRatings(String ratings) {
        this.ratings = ratings;
    }
}

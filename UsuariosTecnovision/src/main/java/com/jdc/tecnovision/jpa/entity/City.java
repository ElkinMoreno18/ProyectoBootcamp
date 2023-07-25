package com.jdc.tecnovision.jpa.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Cities")
@Getter
@Setter
public class City implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "city_id")
    private long cityId;


    @Column(name = "city_name")
    @NotNull
    @NotBlank
    @Size(max = 255)
    private String cityName;

}

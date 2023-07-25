package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.City;
import com.jdc.tecnovision.services.CityServicesImplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/city")
@SessionAttributes("cityController")
public class CityController {

    @Autowired
    CityServicesImplements cityServicesImplements;

    @GetMapping(value = "/list")
    public List<City> listCities(){
        return cityServicesImplements.findAll();
    }
}

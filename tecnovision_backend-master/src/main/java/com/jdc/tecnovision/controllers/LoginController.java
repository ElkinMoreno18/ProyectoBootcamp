package com.jdc.tecnovision.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jdc.tecnovision.jpa.entity.Administrator;
import com.jdc.tecnovision.jpa.entity.Customer;
import com.jdc.tecnovision.services.AdministratorServicesImplements;
import com.jdc.tecnovision.services.CustomerServicesImplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins= "*")
@RequestMapping("/login")
@SessionAttributes("loginController")
public class LoginController {

    @Autowired
    CustomerServicesImplements customerServicesImplements;

    @Autowired
    AdministratorServicesImplements administratorServicesImplements;

    @GetMapping(value = "/check/{userType}")
    public String[] checkLogin(@RequestParam(value = "person") String object, @PathVariable(value = "userType") String userType) {
        ObjectMapper objectMapper = new ObjectMapper();
        String[] data = {"0","N/A"};
        switch (userType) {
            case "administrator":
                Administrator administrator = getIdAdministrator(object, objectMapper);
                if (administrator != null) {
                    data[0] = Long.toString(administrator.getAdministratorId());
                    data[1] = "administrator";
                }
                break;
            case "customer":
                Customer customer = getIdCustomer(object, objectMapper);
                if (customer != null) {
                    data[0] = Long.toString(customer.getCustomerId());
                    data[1] = "customer";
                }
                break;
        }
        return data;
    }

    public Customer getIdCustomer(String data, ObjectMapper objectMapper) {
        Customer customer = new Customer();
        try {
            customer = objectMapper.readValue(data, Customer.class);
            customer = customerServicesImplements.login(customer.getEmail(), customer.getPassword());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return customer;
    }

    public Administrator getIdAdministrator(String data, ObjectMapper objectMapper) {
        Administrator administrator = new Administrator();
        try {
            administrator = objectMapper.readValue(data, Administrator.class);
            administrator = administratorServicesImplements.login(administrator.getEmail(), administrator.getPassword());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return administrator;
    }

}

package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.Customer;
import com.jdc.tecnovision.services.CustomerServicesImplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer")
@SessionAttributes("customerController")
public class CustomerController {

    @Autowired
    CustomerServicesImplements customerServicesImplements;

    @GetMapping("/list")
    public List<Customer> listCustomers() {
        return customerServicesImplements.findAll();
    }

    @PostMapping(value = "/save")
    public List<String> saveCustomer(@Valid @RequestBody Customer customer, BindingResult bd, SessionStatus sd) {
        String[] field = {"document", "address", "state", "name", "lastName", "email", "phone", "password", "city"};
        String message = "";
        List<String> results = new ArrayList<>();
        if (bd.hasErrors()) {
            for (String s : field) {
                if (bd.hasFieldErrors(s)) {
                    results.add(bd.getFieldError(s).getDefaultMessage());
                } else {
                    results.add(" ");
                }
            }
        } else {
            try {
                message = ((customer.getCustomerId() == 0) ? "El cliente ha sido registrado" : "Datos actualizados correctamente");
                customerServicesImplements.save(customer);
                sd.setComplete();
            } catch (DataIntegrityViolationException e) {
                message = getConstraintMessage(e.getMostSpecificCause().getMessage());
            } catch (Exception e) {
                message = (customer.getCustomerId() == 0) ? "Error al crear el cliente" : "Error al realizar los cambios";
            }
            results.add(message);
        }
        return results;
    }

    @GetMapping(value = "/view/{id}")
    public Customer viewCustomer(@PathVariable(value = "id") Long idCustomer) {
        return customerServicesImplements.findById(idCustomer);
    }

    public String getConstraintMessage(String message) {
        String constraintName = message.split("key ")[1].replace("'", "");
        String constraintMessage = "";
        constraintMessage = (constraintName.equals("customerDocument")) ? "Ya existe un cliente con el mismo documento" : "Ya existe un cliente con el mismo email";
        return constraintMessage;
    }
}

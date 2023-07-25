package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.PaymentMethod;
import com.jdc.tecnovision.services.PaymentMethodServicesImplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/paymentMethod")
@SessionAttributes("paymentMethodController")
public class PaymentMethodController {

    @Autowired
    PaymentMethodServicesImplements paymentMethodServicesImplements;

    @GetMapping(value = "/list")
    public List<PaymentMethod> listPaymentMethods(){
        return paymentMethodServicesImplements.findAll();
    }

}

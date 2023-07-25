package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.Discount;
import com.jdc.tecnovision.services.DiscountServicesImplements;
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
@RequestMapping("/discount")
@SessionAttributes("discountController")
public class DiscountController {

    @Autowired
    DiscountServicesImplements discountServicesImplements;

    @GetMapping("/list")
    public List<Discount> listDiscounts() {
        return discountServicesImplements.findAll();
    }

    @PostMapping(value = "/save")
    public List<String> saveDiscount(@Valid @RequestBody Discount discount, BindingResult bd, SessionStatus sd) {
        String[] field = {"value", "state"};
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
                message = ((discount.getDiscountId() == 0) ? "El descuento ha sido registrado" : "Datos actualizados correctamente");
                discount.setValue(discount.getValue() / 100);
                discountServicesImplements.save(discount);
                sd.setComplete();
            } catch (DataIntegrityViolationException e) {
                message = getConstraintMessage(e.getMostSpecificCause().getMessage());
            } catch (Exception e) {
                message = (discount.getDiscountId() == 0) ? "Error al crear el descuento" : "Error al realizar los cambios";
            }
            results.add(message);
        }
        return results;
    }

    @GetMapping(value = "/view/{id}")
    public Discount viewDiscount(@PathVariable(value = "id") Long idDiscount) {
        return discountServicesImplements.findById(idDiscount);
    }

    public String getConstraintMessage(String message) {
        String constraintName = message.split("key ")[1].replace("'", "");
        String constraintMessage = "";
        constraintMessage = (constraintName.equals("discountValue")) ? "Ya existe un descuento con el mismo valor" : "";
        return constraintMessage;
    }
}

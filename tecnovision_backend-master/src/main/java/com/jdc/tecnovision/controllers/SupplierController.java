package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.Supplier;
import com.jdc.tecnovision.services.SupplierServicesImplements;
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
@RequestMapping("/supplier")
@SessionAttributes("supplierController")
public class SupplierController {

    @Autowired
    SupplierServicesImplements supplierServicesImplements;

    @GetMapping("/list")
    public List<Supplier> listSuppliers() {
        return supplierServicesImplements.findAll();
    }

    @PostMapping(value = "/save")
    public List<String> saveSupplier(@Valid @RequestBody Supplier supplier, BindingResult bd, SessionStatus sd) {
        String[] field = {"nit", "name", "phone", "email", "city", "state"};
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
                message = ((supplier.getSupplierId() == 0) ? "El proveedor ha sido registrado" : "Datos actualizados correctamente");
                supplierServicesImplements.save(supplier);
                sd.setComplete();
            } catch (DataIntegrityViolationException e) {
                message = getConstraintMessage(e.getMostSpecificCause().getMessage());
            } catch (Exception e) {
                message = (supplier.getSupplierId() == 0) ? "Error al crear el proveedor" : "Error al realizar los cambios";
            }
            results.add(message);
        }
        return results;
    }

    @GetMapping(value = "/view/{id}")
    public Supplier viewSupplier(@PathVariable(value = "id") Long idSupplier) {
        return supplierServicesImplements.findById(idSupplier);
    }

    public String getConstraintMessage(String message) {
        String constraintName = message.split("key ")[1].replace("'","");
        String constraintMessage = "";
        constraintMessage = (constraintName.equals("supplierNit")) ? "Ya existe un proveedor con el mismo NIT" : "Ya existe un proveedor con el mismo nombre";
        return constraintMessage;
    }

}

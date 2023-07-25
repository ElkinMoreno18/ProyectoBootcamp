package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.Brand;
import com.jdc.tecnovision.services.BrandServicesImplements;
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
@RequestMapping("/brand")
@SessionAttributes("brandController")
public class BrandController {

    @Autowired
    BrandServicesImplements brandServicesImplements;

    @GetMapping("/list")
    public List<Brand> listBrands() {
        return brandServicesImplements.findAll();
    }

    @PostMapping(value = "/save")
    public List<String> saveBrand(@Valid @RequestBody Brand brand, BindingResult bd, SessionStatus sd) {
        String[] field = {"name", "state"};
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
                message = ((brand.getBrandId() == 0) ? "La marca ha sido registrada" : "Datos actualizados correctamente");
                brandServicesImplements.save(brand);
                sd.setComplete();
            } catch (DataIntegrityViolationException e) {
                message = getConstraintMessage(e.getMostSpecificCause().getMessage());
            } catch (Exception e) {
                message = (brand.getBrandId() == 0) ? "Error al crear la marca" : "Error al realizar los cambios";
            }
            results.add(message);
        }
        return results;
    }

    @GetMapping(value = "/view/{id}")
    public Brand viewBrand(@PathVariable(value = "id") Long idClient) {
        return brandServicesImplements.findById(idClient);
    }

    public String getConstraintMessage(String message) {
        String constraintName = message.split("key ")[1].replace("'","");
        String constraintMessage = "";
        constraintMessage = (constraintName.equals("brandName")) ? "Ya existe una marca con el mismo nombre": "";
        return constraintMessage;
    }
}

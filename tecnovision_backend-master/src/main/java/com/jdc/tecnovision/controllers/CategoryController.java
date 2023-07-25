package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.Category;
import com.jdc.tecnovision.services.CategoryServicesImplements;
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
@RequestMapping("/category")
@SessionAttributes("categoryController")
public class CategoryController {

    @Autowired
    CategoryServicesImplements categoryServicesImplements;

    @GetMapping("/list")
    public List<Category> listCategories() {
        return categoryServicesImplements.findAll();
    }

    @PostMapping(value = "/save")
    public List<String> saveCategory(@Valid @RequestBody Category category, BindingResult bd, SessionStatus sd) {
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
                message = ((category.getCategoryId() == 0) ? "La categoria ha sido registrada" : "Datos actualizados correctamente");
                if(category.getDiscount().getDiscountId() == 0){
                    category.setDiscount(null);
                }
                categoryServicesImplements.save(category);
                sd.setComplete();
            } catch (DataIntegrityViolationException e) {
                message = getConstraintMessage(e.getMostSpecificCause().getMessage());
            } catch (Exception e) {
                message = (category.getCategoryId() == 0) ? "Error al crear la categoria" : "Error al realizar los cambios";
            }
            results.add(message);
        }
        return results;
    }

    @GetMapping(value = "/view/{id}")
    public Category viewCategory(@PathVariable(value = "id") Long idCategory) {
        return categoryServicesImplements.findById(idCategory);
    }

    public String getConstraintMessage(String message) {
        String constraintName = message.split("key ")[1].replace("'","");
        String constraintMessage = "";
        constraintMessage = (constraintName.equals("categoryName")) ? "Ya existe una categoria con el mismo nombre": "";
        return constraintMessage;
    }

}

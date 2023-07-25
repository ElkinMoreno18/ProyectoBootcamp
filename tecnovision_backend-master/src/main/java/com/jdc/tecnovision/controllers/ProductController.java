package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.Product;
import com.jdc.tecnovision.services.ProductServicesImplements;
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
@RequestMapping("/product")
@SessionAttributes("productController")
public class ProductController {

    @Autowired
    ProductServicesImplements productServicesImplements;

    @GetMapping("/list")
    public List<Product> listProducts() {
        return productServicesImplements.findAll();
    }

    @PostMapping(value = "/save")
    public List<String> saveProduct(@Valid @RequestBody Product product, BindingResult bd, SessionStatus sd) {
        String[] field = {"code", "description", "category", "name", "state", "brand", "stock", "price", "supplier", "imagePath"};
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
                message = ((product.getProductId() == 0) ? "El producto ha sido registrado" : "Datos actualizados correctamente");
                productServicesImplements.save(product);
                sd.setComplete();
            } catch (DataIntegrityViolationException e) {
                message = getConstraintMessage(e.getMostSpecificCause().getMessage());
            } catch (Exception e) {
                message = ((product.getProductId() == 0)) ? "Error al crear el producto" : "Error al realizar los cambios";
                results.add(message);
            }
            results.add(message);
        }
        return results;
    }

    @GetMapping(value = "/view/{id}")
    public Product viewProduct(@PathVariable(value = "id") Long idProduct) {
        return productServicesImplements.findById(idProduct);
    }

    public String getConstraintMessage(String message) {
        String constraintName = message.split("key ")[1].replace("'", "");
        String constraintMessage = "";
        constraintMessage = (constraintName.equals("productCode")) ? "Ya existe un producto con el mismo código" : "Ya existe un producto con el mismo nombre";
        return constraintMessage;
    }

}

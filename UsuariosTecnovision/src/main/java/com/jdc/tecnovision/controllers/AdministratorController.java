package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.Administrator;
import com.jdc.tecnovision.services.AdministratorServicesImplements;
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
@RequestMapping("/administrator")
@SessionAttributes("administratorController")
public class AdministratorController {

    @Autowired
    AdministratorServicesImplements administratorServicesImplements;

    @GetMapping(value = "/list")
    public List<Administrator> listAdministrators() {
        return administratorServicesImplements.findAll();
    }

    @PostMapping(value = "/save")
    public List<String> createAdministrator(@Valid @RequestBody Administrator administrator, BindingResult bd, SessionStatus sd) {
        String[] field = {"document", "email", "state", "name", "lastName", "phone", "address", "password", "city"};
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
                message = ((administrator.getAdministratorId() == 0) ? "El administrador ha sido registrado" : "Datos actualizados correctamente");
                administratorServicesImplements.save(administrator);
                sd.setComplete();
            } catch (DataIntegrityViolationException e) {
                message = getConstraintMessage(e.getMostSpecificCause().getMessage());
            } catch (Exception e) {
                message = ((administrator.getAdministratorId() == 0)) ? "Error al crear el administrador" : "Error al realizar los cambios";
            }
            results.add(message);
        }
        return results;
    }

    @GetMapping(value = "/view/{id}")
    public Administrator viewAdministrator(@PathVariable(value = "id") Long id) {
        return administratorServicesImplements.findById(id);
    }

    public String getConstraintMessage(String message) {
        String constraintName = message.split("key ")[1].replace("'","");
        String constraintMessage = "";
        constraintMessage = (constraintName.equals("administratorDocument")) ? "Ya existe un administrador con el mismo documento": "Ya existe un administrador con el mismo email";
        return constraintMessage;
    }

}

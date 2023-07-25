package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.Service;
import com.jdc.tecnovision.services.ServiceServicesImplements;
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
@RequestMapping("/service")
@SessionAttributes("serviceController")
public class ServiceController {
    
    @Autowired
    ServiceServicesImplements serviceServicesImplements;
    
    @GetMapping("/list")
    public List<Service> listServices() {
        return serviceServicesImplements.findAll();
    }
    
    @PostMapping(value = "/save")
    public List<String> saveService(@Valid @RequestBody Service service, BindingResult bd, SessionStatus sd) {
        String[] field = {"name", "description", "value", "state"};
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
                message = (service.getServiceId() == 0) ? "El servicio ha sido registrado" : "Datos actualizados correctamente";
                service.setValue(service.getValue() / 100);
                serviceServicesImplements.save(service);
                sd.setComplete();
            } catch (DataIntegrityViolationException e) {
                message = getConstraintMessage(e.getMostSpecificCause().getMessage());
            } catch (Exception e) {
                e.printStackTrace();
                message = (service.getServiceId() == 0) ? "Error al crear el servicio" : "Error al realizar los cambios";
            }
            results.add(message);
        }
        return results;
    }
    
    @GetMapping(value = "/view/{id}")
    public Service viewService(@PathVariable(value = "id") Long idService) {
        return serviceServicesImplements.findById(idService);
    }

    //Duplicate entry 'Alquiler' for key 'serviceFieldsUnique'
    public String getConstraintMessage(String message) {
        String constraintName = message.split("key ")[1].replace("'", "");
        String constraintMessage = "";
        constraintMessage = (constraintName.equals("serviceName")) ? "Ya existe un servicio con el mismo nombre" : "Ya existe un servicio con la misma descripción";
        return constraintMessage;
    }
    
}

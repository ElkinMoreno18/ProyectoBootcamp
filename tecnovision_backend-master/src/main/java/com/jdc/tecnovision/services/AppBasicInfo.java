package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoAdministrator;
import com.jdc.tecnovision.dao.IDaoCity;
import com.jdc.tecnovision.dao.IDaoPaymentMethod;
import com.jdc.tecnovision.jpa.entity.Administrator;
import com.jdc.tecnovision.jpa.entity.City;
import com.jdc.tecnovision.jpa.entity.PaymentMethod;
import java.math.BigDecimal;
import java.util.List;
import javax.annotation.PostConstruct;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppBasicInfo {
    
    @Autowired
    private IDaoCity iDaoCity;
    
    @Autowired
    private IDaoPaymentMethod iDaoPaymentMethod;
    
    @Autowired
    private IDaoAdministrator iDaoAdministrator;
    
    @PostConstruct
    public void constructor() {
        saveCities();
        savePaymentMethods();
        saveDefaultAdministratorAccount();
    }
    
    public void saveCities() {
        List<City> cities = (List<City>) this.iDaoCity.findAll();
        if (cities.isEmpty()) {
            LogManager.getLogger(this.getClass()).warn("------- Creating Cities -----------");
            String[] cityNames = {"TUNJA", "BOGOTÁ", "SOGAMOSO", "PAIPA", "ZIPAQUIRÁ", "TUTA", "DUITAMA", "CALI",
                "TOTA", "AQUITANIA", "VILLAPINZÓN", "VENTAQUEMADA"};
            for (String cityName : cityNames) {
                City city = new City();
                city.setCityName(cityName);
                cities.add(city);
            }
            this.iDaoCity.saveAll(cities);
        }
    }
    
    public void savePaymentMethods() {
        List<PaymentMethod> paymentMethods = (List<PaymentMethod>) this.iDaoPaymentMethod.findAll();
        if (paymentMethods.isEmpty()) {
            LogManager.getLogger(this.getClass()).warn("------- Creating Payment Methods -----------");
            String[] paymentMethodsNames = {"PayPal", "Nequi", "Transferencia Bancaria"};
            for (String PaymentMethodName : paymentMethodsNames) {
                PaymentMethod PaymentMethod = new PaymentMethod();
                PaymentMethod.setPaymentMethod(PaymentMethodName);
                paymentMethods.add(PaymentMethod);
            }
            this.iDaoPaymentMethod.saveAll(paymentMethods);
        }
    }
    
    public void saveDefaultAdministratorAccount() {
        List<Administrator> administrators = (List<Administrator>) this.iDaoAdministrator.findAll();
        if (administrators.isEmpty()) {
            LogManager.getLogger(this.getClass()).warn("------- Creating Default Administrator -----------");
            Administrator administrator = new Administrator();
            administrator.setName("tecnovision");
            administrator.setLastName("admin");
            administrator.setAddress("default");
            administrator.setDocument(1);
            administrator.setEmail("admin1@tecnovision.com");
            administrator.setPhone(new BigDecimal("3001112323"));
            administrator.setState(true);
            administrator.setPassword("admin1");
            administrator.setCity(this.iDaoCity.findById((long) 1).orElse(null));
            this.iDaoAdministrator.save(administrator);
        }
    }
    
}

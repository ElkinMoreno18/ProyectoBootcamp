package com.jdc.tecnovision.services;

import org.junit.Test;
import static org.junit.Assert.*;
import com.jdc.tecnovision.jpa.entity.Service;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ServiceServicesImplementsIT {

    @Autowired
    private ServiceServicesImplements servicesImplements;

    /**
     * Test of save method, of class ServiceServicesImplements.
     */
    @Test
    public void testSave() {
        Service service = new Service();
        service.setName("servicio prueba");
        service.setDescription("servicio prueba servicio prueba servicio prueba servicio prueba servicio prueba");
        service.setState(true);
        this.servicesImplements.save(service);
        assertTrue(service.getServiceId() > 0);
    }

    /**
     * Test of findAll method, of class ServiceServicesImplements.
     */
    @Test
    public void testFindAll() {
        assertTrue(this.servicesImplements.findAll().size() > 0);
    }

    /**
     * Test of findById method, of class ServiceServicesImplements.
     */
    @Test
    public void testFindById() {
        assertNotNull(this.servicesImplements.findById((long) 1));
    }

}

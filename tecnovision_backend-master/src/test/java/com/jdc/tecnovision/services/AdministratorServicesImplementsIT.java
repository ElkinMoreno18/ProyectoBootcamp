package com.jdc.tecnovision.services;

import com.jdc.tecnovision.jpa.entity.Administrator;
import java.math.BigDecimal;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class AdministratorServicesImplementsIT {

    @Autowired
    private AdministratorServicesImplements administratorServicesImplements;

    @Autowired
    private CityServicesImplements cityServicesImplements;

    /**
     * Test of save method, of class AdministratorServicesImplements.
     */
    @Test
    public void testSave() {
        Administrator administrator = new Administrator();
        administrator.setDocument(141023012);
        administrator.setName("Elkin");
        administrator.setLastName("Moreno");
        administrator.setEmail("elkin.moreno@tecnovision.com");
        administrator.setAddress("calle 5a");
        administrator.setPhone(new BigDecimal("3114569012"));
        administrator.setPassword("elkin123");
        administrator.setState(true);
        administrator.setCity(this.cityServicesImplements.findAll().get(0));
        this.administratorServicesImplements.save(administrator);
        assertTrue(administrator.getAdministratorId()> 0);
    }

    /**
     * Test of findAll method, of class AdministratorServicesImplements.
     */
    @Test
    public void testFindAll() {
        assertTrue(this.administratorServicesImplements.findAll().size() > 0);
    }

    /**
     * Test of findById method, of class AdministratorServicesImplements.
     */
    @Test
    public void testFindById() {
        assertNotNull(this.administratorServicesImplements.findById((long) 1));
    }

}

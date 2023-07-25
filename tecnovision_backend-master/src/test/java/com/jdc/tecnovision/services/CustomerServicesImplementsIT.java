package com.jdc.tecnovision.services;

import com.jdc.tecnovision.jpa.entity.Customer;
import java.math.BigDecimal;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class CustomerServicesImplementsIT {

    @Autowired
    private CustomerServicesImplements customerServicesImplements;

    @Autowired
    private AdministratorServicesImplements administratorServicesImplements;

    @Autowired
    private CityServicesImplements cityServicesImplements;

    /**
     * Test of save method, of class CustomerServicesImplements.
     */
    @Test
    public void testSave() {
        Customer customer = new Customer();
        customer.setDocument(1031023012);
        customer.setName("Juan");
        customer.setLastName("Martínez");
        customer.setEmail("j123@gmail.es");
        customer.setPhone(new BigDecimal("316780213"));
        customer.setAddress("calle 8b #13-21");
        customer.setPassword("jmar123");
        customer.setState(true);
        customer.setAdministrator(this.administratorServicesImplements.findById((long) 1));
        customer.setCity(this.cityServicesImplements.findAll().get(0));
        this.customerServicesImplements.save(customer);
        assertTrue(customer.getCustomerId() > 0);
    }

    /**
     * Test of findAll method, of class CustomerServicesImplements.
     */
    @Test
    public void testFindAll() {
        assertTrue(this.customerServicesImplements.findAll().size() > 0);
    }

    /**
     * Test of findById method, of class CustomerServicesImplements.
     */
    @Test
    public void testFindById() {
        assertNotNull(this.customerServicesImplements.findById((long) 1));
    }

}

package com.jdc.tecnovision.services;

import com.jdc.tecnovision.jpa.entity.Supplier;
import java.math.BigDecimal;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class SupplierServicesImplementsIT {

    @Autowired
    private SupplierServicesImplements supplierServicesImplements;

    @Autowired
    private CityServicesImplements cityServicesImplements;

    /**
     * Test of save method, of class SupplierServicesImplements.
     */
    @Test
    public void testSave() {
        Supplier supplier = new Supplier();
        supplier.setNit("9999123-12");
        supplier.setName("Samsung");
        supplier.setEmail("samsung@gmail.com");
        supplier.setPhone(new BigDecimal("3124657809"));
        supplier.setState(true);
        supplier.setCity(this.cityServicesImplements.findAll().get(0));
        this.supplierServicesImplements.save(supplier);
        assertTrue(supplier.getSupplierId() > 0);
    }

    /**
     * Test of findAll method, of class SupplierServicesImplements.
     */
    @Test
    public void testFindAll() {
        assertTrue(this.supplierServicesImplements.findAll().size() > 0);
    }

    /**
     * Test of findById method, of class SupplierServicesImplements.
     */
    @Test
    public void testFindById() {
        assertNotNull(this.supplierServicesImplements.findById((long) 1));
    }

}

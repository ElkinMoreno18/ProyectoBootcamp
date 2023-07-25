package com.jdc.tecnovision.services;

import com.jdc.tecnovision.jpa.entity.Brand;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class BrandServicesImplementsIT {

    @Autowired
    private BrandServicesImplements brandServicesImplements;

    /**
     * Test of save method, of class BrandServicesImplements.
     */
    @Test
    public void testSave() {
        Brand brand = new Brand();
        brand.setName("prueba marca");
        brand.setState(true);
        this.brandServicesImplements.save(brand);
    }

    /**
     * Test of findAll method, of class BrandServicesImplements.
     */
    @Test
    public void testFindAll() {
        assertTrue(this.brandServicesImplements.findAll().size() > 0);
    }

    /**
     * Test of findById method, of class BrandServicesImplements.
     */
    @Test
    public void testFindById() {
        assertNotNull(this.brandServicesImplements.findById((long) 1));
    }

}

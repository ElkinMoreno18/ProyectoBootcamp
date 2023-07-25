package com.jdc.tecnovision.services;

import com.jdc.tecnovision.jpa.entity.Discount;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class DiscountServicesImplementsIT {

    @Autowired
    private DiscountServicesImplements discountServicesImplements;

    /**
     * Test of save method, of class DiscountServicesImplements.
     */
    @Test
    public void testSave() {
        Discount discount = new Discount();
        discount.setValue(0.7);
        discount.setState(true);
        this.discountServicesImplements.save(discount);
        assertTrue(discount.getDiscountId() > 0);
    }

    /**
     * Test of findAll method, of class DiscountServicesImplements.
     */
    @Test
    public void testFindAll() {
        assertTrue(this.discountServicesImplements.findAll().size() > 0);
    }

    /**
     * Test of findById method, of class DiscountServicesImplements.
     */
    @Test
    public void testFindById() {
        assertNotNull(this.discountServicesImplements.findById((long) 1));
    }

}

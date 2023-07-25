package com.jdc.tecnovision.services;

import com.jdc.tecnovision.jpa.entity.Category;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class CategoryServicesImplementsIT {

    @Autowired
    private CategoryServicesImplements categoryServicesImplements;

    @Autowired
    private DiscountServicesImplements discountServicesImplements;

    /**
     * Test of save method, of class CategoryServicesImplements.
     */
    @Test
    public void testSave() {
        Category category = new Category();
        category.setName("Sensores");
        category.setState(true);
        category.setDiscount(this.discountServicesImplements.findById((long) 1));
        this.categoryServicesImplements.save(category);
        assertTrue(category.getCategoryId() > 0);
    }

    /**
     * Test of findAll method, of class CategoryServicesImplements.
     */
    @Test
    public void testFindAll() {
        assertTrue(this.categoryServicesImplements.findAll().size() > 0);
    }

    /**
     * Test of findById method, of class CategoryServicesImplements.
     */
    @Test
    public void testFindById() {
        assertNotNull(this.categoryServicesImplements.findById((long) 1));
    }

}

package com.jdc.tecnovision.services;

import com.jdc.tecnovision.jpa.entity.Product;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ProductServicesImplementsIT {

    @Autowired
    private ProductServicesImplements productServicesImplements;

    @Autowired
    private CategoryServicesImplements categoryServicesImplements;

    @Autowired
    private BrandServicesImplements brandServicesImplements;

    @Autowired
    private SupplierServicesImplements supplierServicesImplements;

    /**
     * Test of save method, of class ProductServicesImplements.
     */
    @Test
    public void testSave() {
        Product product = new Product();
        product.setCode(150);
        product.setName("Sensor temperatura");
        product.setStock(350);
        product.setDescription("Sensor de temperatura alta tecnología, resistente y duradero. Material inoxidable.");
        product.setImagePath("d://camarahanwha.jpg");
        product.setState(true);
        product.setPrice(20000);
        product.setCategory(this.categoryServicesImplements.findById((long) 1));
        product.setBrand(this.brandServicesImplements.findById((long) 1));
        product.setSupplier(this.supplierServicesImplements.findById((long) 1));
        this.productServicesImplements.save(product);
        assertTrue(product.getProductId() > 0);
    }

    /**
     * Test of findAll method, of class ProductServicesImplements.
     */
    @Test
    public void testFindAll() {
        assertTrue(this.productServicesImplements.findAll().size() > 0);
    }

    /**
     * Test of findById method, of class ProductServicesImplements.
     */
    @Test
    public void testFindById() {
        assertNotNull(this.productServicesImplements.findById((long) 2));
    }

}

package com.jdc.tecnovision.dao;

import com.jdc.tecnovision.jpa.entity.Product;
import org.springframework.data.repository.CrudRepository;

public interface IDaoProduct extends CrudRepository<Product, Long> {
}

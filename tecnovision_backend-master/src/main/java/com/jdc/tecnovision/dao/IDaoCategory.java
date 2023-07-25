package com.jdc.tecnovision.dao;

import com.jdc.tecnovision.jpa.entity.Category;
import org.springframework.data.repository.CrudRepository;

public interface IDaoCategory extends CrudRepository<Category, Long> {

}

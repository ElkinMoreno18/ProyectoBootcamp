package com.jdc.tecnovision.dao;

import com.jdc.tecnovision.jpa.entity.City;
import org.springframework.data.repository.CrudRepository;

public interface IDaoCity extends CrudRepository<City,Long> {

}

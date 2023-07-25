package com.jdc.tecnovision.dao;

import com.jdc.tecnovision.jpa.entity.Service;
import org.springframework.data.repository.CrudRepository;

public interface IDaoService extends CrudRepository<Service, Long> {

}

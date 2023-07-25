package com.jdc.tecnovision.dao;

import com.jdc.tecnovision.jpa.entity.Supplier;
import org.springframework.data.repository.CrudRepository;

public interface IDaoSupplier extends CrudRepository<Supplier, Long> {

}

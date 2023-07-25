package com.jdc.tecnovision.dao;

import com.jdc.tecnovision.jpa.entity.Administrator;
import org.springframework.data.repository.CrudRepository;

public interface IDaoAdministrator extends CrudRepository<Administrator, Long> {

    Administrator findByEmailAndPassword(String email, String password);

}

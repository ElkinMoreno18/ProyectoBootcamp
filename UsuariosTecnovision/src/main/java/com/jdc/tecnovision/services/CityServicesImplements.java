package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoCity;
import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.jpa.entity.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServicesImplements implements ITransferObjects<City> {

    @Autowired
    IDaoCity iDaoCity;

    @Override
    public void save(City o) {}

    @Override
    public List<City> findAll() {
        return (List<City>) iDaoCity.findAll();
    }

    @Override
    public City findById(Long id) {
        return null;
    }
}

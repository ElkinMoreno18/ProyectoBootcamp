package com.jdc.tecnovision.interfaces;

import java.util.List;

public interface ITransferObjects<T> {

    /*
      metodo que persiste el objeto deseado en base de datos
    */
    void save(T o);

    /*
      metodo que lista toda la inormacion relacionada con el objeto buscado
     */
    List<T> findAll();

    /*
      metodo que lista la informacion de un objeto buscado por su id
     */
    T findById(Long id);

}

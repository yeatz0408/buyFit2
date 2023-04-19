package com.gmail.yeatz0408.buyFit2Backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gmail.yeatz0408.buyFit2Backend.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}

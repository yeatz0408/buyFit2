package com.gmail.yeatz0408.buyFit2Backend.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import com.gmail.yeatz0408.buyFit2Backend.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findAll(Pageable pageable);

    Page<Product> findByCategoryId(@RequestParam("categoryId") Long categoryId, Pageable pageable);

    public Optional<Product> findBySlug(String slug);

    
    
}

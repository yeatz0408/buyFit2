package com.gmail.yeatz0408.buyFit2Backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gmail.yeatz0408.buyFit2Backend.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    public Optional<Product> findBySlug(String slug);
    
}

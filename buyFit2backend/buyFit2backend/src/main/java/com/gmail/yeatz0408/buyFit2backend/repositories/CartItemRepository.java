package com.gmail.yeatz0408.buyFit2Backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gmail.yeatz0408.buyFit2Backend.entities.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByUserEmailAndProductId(String userEmail, Long productId);

    List<CartItem> findCartItemsByUserEmail(String userEmail);
    
}

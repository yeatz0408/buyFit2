package com.gmail.yeatz0408.buyFit2Backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gmail.yeatz0408.buyFit2Backend.entities.Page;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {

    Optional<Page> findBySlug(String slug);

    Optional<Page> findByTitle(String title);

    // Page findBySlugAndIdNot(Long id, String slug);

    // List<Page> findAllByOrderBySortingAsc();
    
}



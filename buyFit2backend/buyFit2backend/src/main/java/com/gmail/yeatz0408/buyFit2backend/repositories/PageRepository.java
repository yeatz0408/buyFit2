package com.gmail.yeatz0408.buyFit2backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gmail.yeatz0408.buyFit2backend.entities.Page;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {

    Page findBySlug(String slug);

    Page findBySlugAndIdNot(Long id, String slug);

    List<Page> findAllByOrderBySortingAsc();
    
}



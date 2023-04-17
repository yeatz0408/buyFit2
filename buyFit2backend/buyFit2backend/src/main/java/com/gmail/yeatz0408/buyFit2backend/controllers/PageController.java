package com.gmail.yeatz0408.buyFit2backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmail.yeatz0408.buyFit2backend.entities.Page;
import com.gmail.yeatz0408.buyFit2backend.repositories.PageRepository;

@RestController
@RequestMapping(path = "/pages")
@CrossOrigin(origins = "*")
public class PageController {

    @Autowired
    private PageRepository pageRepo;

    @GetMapping("/all")
    public Iterable<Page> getAll() {

        List<Page> pages = pageRepo.findAll();

        return pages;
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Page> page(@PathVariable String slug) {

        // Page page = pageRepo.findBySlug(slug);
        // if (page == null) return null;
        // return page;

        Optional<Page> optPage = pageRepo.findBySlug(slug);

        if (optPage.isPresent()) {
            return new ResponseEntity<>(optPage.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        
    }
    
}

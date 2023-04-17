package com.gmail.yeatz0408.buyFit2backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.gmail.yeatz0408.buyFit2backend.entities.Page;
import com.gmail.yeatz0408.buyFit2backend.repositories.PageRepository;

@RestController
@RequestMapping("/admin/pages")
@CrossOrigin(origins = "*")
public class AdminPagesController {

    @Autowired
    private PageRepository pageRepo;

    @GetMapping
    public Iterable<Page> index() {
        List<Page> pages = pageRepo.findAll();

        return pages;
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Page add(@RequestBody Page page) {
        return pageRepo.save(page);
    }

    @GetMapping("/edit/{id}")
    public ResponseEntity<Page> edit(@PathVariable Long id) {

        Optional<Page> optPage = pageRepo.findById(id);

        return new ResponseEntity<>(optPage.get(), HttpStatus.OK);       
    }

    @PutMapping("/edit/{id}")
    public Page put(@RequestBody Page page) {
        return pageRepo.save(page);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        
        try {
            pageRepo.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            
        }
        
        
    }
    
}

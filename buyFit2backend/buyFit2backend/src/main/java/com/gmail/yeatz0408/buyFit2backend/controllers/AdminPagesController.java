package com.gmail.yeatz0408.buyFit2Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
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

import com.gmail.yeatz0408.buyFit2Backend.Exceptions.DataNotFoundException;
import com.gmail.yeatz0408.buyFit2Backend.entities.Page;
import com.gmail.yeatz0408.buyFit2Backend.repositories.PageRepository;

@RestController
@RequestMapping("/admin/pages")
@CrossOrigin(origins="http://localhost:3000")
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

        System.out.println("+++++++++++++++++++++++++" + page.getTitle());

        if (page.getSlug() == "" || page.getSlug() == null ) {
            page.setSlug(page.getTitle().toLowerCase().replace(" ", "-"));
        } else {
            page.getSlug().toLowerCase().replace(" ", "-");
        }        

        return pageRepo.save(page);
    }

    @GetMapping("/edit/{id}")
    public Page edit(@PathVariable Long id) {

        return pageRepo.findById(id).orElseThrow(() -> new DataNotFoundException(this.getClass() + " : " + id));
    }

    @PutMapping("/edit/{id}")
    public Page put(@RequestBody Page page) {

        if (page.getSlug() == "" ) {
            page.setSlug(page.getTitle().toLowerCase().replace(" ", "-"));
        } else {
            page.getSlug().toLowerCase().replace(" ", "-");
        }

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

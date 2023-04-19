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
import com.gmail.yeatz0408.buyFit2Backend.entities.Category;
import com.gmail.yeatz0408.buyFit2Backend.repositories.CategoryRepository;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin/categories")
public class AdminCategoriesController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Category getOne(@PathVariable Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new DataNotFoundException(this.getClass() + " : " + id));
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Category add(@RequestBody Category category) {

        category.setSlug(category.getName().toLowerCase().replace(" ","-"));

        return categoryRepository.save(category);
    }

    @GetMapping("/edit/{id}")
    public Category edit(@PathVariable Long id) {

        return categoryRepository.findById(id).orElseThrow(() -> new DataNotFoundException(this.getClass() + " : " + id));
    }

    @PutMapping("/edit/{id}")
    public Category put(@RequestBody Category category) {

        category.setSlug(category.getName().toLowerCase().replace(" ","-"));

        return categoryRepository.save(category);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        
        try {
            categoryRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            
        }
    }
}

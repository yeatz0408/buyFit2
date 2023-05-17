package com.gmail.yeatz0408.buyFit2Backend.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.gmail.yeatz0408.buyFit2Backend.Exceptions.DataNotFoundException;
import com.gmail.yeatz0408.buyFit2Backend.entities.Product;
import com.gmail.yeatz0408.buyFit2Backend.repositories.CategoryRepository;
import com.gmail.yeatz0408.buyFit2Backend.repositories.ProductRepository;

@RestController
@RequestMapping("/admin/products")
@CrossOrigin(origins="http://localhost:3000")
public class AdminProductsController {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CategoryRepository catRepo;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Product add(@RequestBody Product product) throws IOException {

        String slug = product.getProductName().toLowerCase().replace(" ", "-");

        product.setSlug(slug);

        return productRepo.save(product);
    }

    @GetMapping("/edit/{id}")
    public Product edit(@PathVariable Long id) {

        return productRepo.findById(id).orElseThrow(() -> new DataNotFoundException(this.getClass() + " : " + id));
    }

    @PutMapping("/edit/{id}")
    public Product put(@RequestBody Product product) {

        if (product.getSlug() == "" || product.getSlug() == null) {
            product.setSlug(product.getProductName().toLowerCase().replace(" ", "-"));
        } else {
            product.getSlug().toLowerCase().replace(" ", "-");
        }

        return productRepo.save(product);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        
        try {
            productRepo.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            
        }
    }

}

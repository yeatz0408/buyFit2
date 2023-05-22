package com.gmail.yeatz0408.buyFit2Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gmail.yeatz0408.buyFit2Backend.entities.Category;
import com.gmail.yeatz0408.buyFit2Backend.entities.Product;
import com.gmail.yeatz0408.buyFit2Backend.repositories.CategoryRepository;
import com.gmail.yeatz0408.buyFit2Backend.repositories.ProductRepository;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CategoryRepository catRepo;

    @GetMapping
    public Page<Product> getMyEntities(@RequestParam(name = "page", defaultValue = "0") int page,
                                        @RequestParam(name = "size", defaultValue = "6") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return productRepo.findAll(pageRequest);
    }

    @GetMapping("/{slug}")
    public Page<Product> getProductsByCategory(@PathVariable String slug, 
                                              @RequestParam(name = "page", defaultValue = "0") int page,
                                              @RequestParam(name = "size", defaultValue = "6") int size) {

        Category cat = catRepo.findBySlug(slug);
        
        PageRequest pageRequest = PageRequest.of(page, size);
        
        return productRepo.findByCategoryId(cat.getId(), pageRequest);
    }

    @GetMapping("/all")
    public Page<Product> getAll(@RequestParam(name = "page", defaultValue = "0") int page,
                                              @RequestParam(name = "size", defaultValue = "6") int size) {
        
        PageRequest pageRequest = PageRequest.of(page, size);
        
        return productRepo.findAll(pageRequest);
    }
    
}

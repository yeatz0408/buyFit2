package com.gmail.yeatz0408.buyFit2Backend.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping
    public Iterable<Product> index() {
        List<Product> products = productRepo.findAll();

        return products;
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Product add(@RequestBody Product product, @RequestParam("file") MultipartFile file) throws IOException {

        System.out.println(product.getProductName() + product.getPrice() + product.getDescription());

        Product slugExists = productRepo.findBySlug(product.getSlug())
                            .orElseThrow(() -> new DataNotFoundException(this.getClass() + " : " + product.getId()));;

        boolean fileOk = false;
        byte[] bytes = file.getBytes();
        String filename = file.getOriginalFilename();
        Path path = Paths.get("src/main/resources/static/media/" + filename);

        if ( filename.endsWith("jpg") || filename.endsWith("jpeg") ) {
            fileOk = true;
        }

        if ( fileOk && slugExists != null ) {

            product.setSlug(product.getProductName().toLowerCase().replace(" ", "-"));
            product.setImage(filename);

            Files.write(path, bytes);

            return productRepo.save(product);    
        }

        return null;
    }

    @GetMapping("/edit/{id}")
    public Product edit(@PathVariable Long id) {

        return productRepo.findById(id).orElseThrow(() -> new DataNotFoundException(this.getClass() + " : " + id));
    }

    @PutMapping("/edit/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Product edit(@RequestBody Product product, @RequestParam("file") MultipartFile file) throws IOException {

        Product currentProduct = productRepo.findById(product.getId())
                            .orElseThrow(() -> new DataNotFoundException(this.getClass() + " : " + product.getId()));;

        Product slugExists = productRepo.findBySlug(product.getSlug())
                            .orElseThrow(() -> new DataNotFoundException(this.getClass() + " : " + product.getId()));;

        boolean fileOk = false;
        byte[] bytes = file.getBytes();
        String filename = file.getOriginalFilename();
        Path path = Paths.get("src/main/resources/static/media/" + filename);

        if ( !file.isEmpty() ) {
            if ( filename.endsWith("jpg") ) {
                fileOk = true;
            }
        } else {
            fileOk = true;
        }

        if ( fileOk && slugExists != null ) {

            Path paths2 = Paths.get("src/main/resources/static/media/" + currentProduct.getImage());
            Files.delete(paths2);

            product.setSlug(product.getProductName().toLowerCase().replace(" ", "-"));
            product.setImage(filename);

            Files.write(path, bytes);

            return productRepo.save(product);    
        }

        return null;
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        
        try {
            productRepo.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            
        }
    }

    @PostMapping("/add2")
    @ResponseStatus(HttpStatus.CREATED)
    public Product add2(@RequestBody Product product, @RequestParam("file") MultipartFile file) throws IOException {

        byte[] bytes = file.getBytes();
        String filename = file.getOriginalFilename();
        Path path = Paths.get("src/main/resources/static/media/" + filename);
        Files.write(path, bytes);

        return null;
    }

}

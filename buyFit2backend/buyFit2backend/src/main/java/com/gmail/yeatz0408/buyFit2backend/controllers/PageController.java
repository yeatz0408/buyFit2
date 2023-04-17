package com.gmail.yeatz0408.buyFit2backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
    
}

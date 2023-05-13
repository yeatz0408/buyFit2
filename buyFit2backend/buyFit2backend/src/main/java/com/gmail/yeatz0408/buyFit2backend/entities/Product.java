package com.gmail.yeatz0408.buyFit2Backend.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter @Setter
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    //@Pattern(regexp = "[1-9]", message="カテゴリーを選んでください。")
    @Column(name="category_id")
    private Long categoryId;

    @Column(name="created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime created_at;

    //@Size(min=5, message = "5文字以上入力してください。")
    @Column(name="description")
    private String description;

    @Column(name="img")
    private String img;

    //@Size(min=2, message = "2文字以上入力してください。")
    @Column(name="productName")
    private String productName;

    //@Min(1)
    @Column(name="price")
    private int price;

    @Column(name="slug")
    private String slug;

    @Column(name="updated_at")
    @UpdateTimestamp
    private LocalDateTime updated_at;
    
}

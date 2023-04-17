package com.gmail.yeatz0408.buyFit2backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@NoArgsConstructor
@Getter @Setter
@Table(name = "pages")
public class Page {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min=2, message = "2文字以上入力してください。")
    @Column(name = "title")
    private String title;

    @Column(name = "slug")
    private String slug;

    @Size(min=5, message = "5文字以上入力してください。")
    @Column(name = "content")
    private String content;
}

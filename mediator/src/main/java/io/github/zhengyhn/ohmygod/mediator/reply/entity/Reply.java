package io.github.zhengyhn.ohmygod.mediator.reply.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reply")
public class Reply {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "platform")
    private String platform;

    @Column(name = "url")
    private String url;

    @Column(name = "title")
    private String title;

    @Column(name = "reply")
    private String reply;

    @Column(name = "up")
    private Integer up;

    @Column(name = "author")
    private String author;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    private Long createdAt;

    @Column(name = "updated_at")
    private Long updatedAt;

//    @ManyToMany(mappedBy = "replies")
//    private List<Article> articles;
}

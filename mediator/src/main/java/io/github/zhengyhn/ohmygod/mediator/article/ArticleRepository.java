package io.github.zhengyhn.ohmygod.mediator.article;

import io.github.zhengyhn.ohmygod.mediator.article.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
}

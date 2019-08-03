package io.github.zhengyhn.ohmygod.mediator.article;

import io.github.zhengyhn.ohmygod.mediator.article.entity.ArticleReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleReplyRepository extends JpaRepository<ArticleReply, Long> {
}

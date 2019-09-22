package io.github.zhengyhn.ohmygod.mediator.article.listArticle;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListArticleResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ArticleItem implements Serializable {
        private static final long serialVersionUID = 1L;

        private Long id;
        private String title;
        private String description;
        private String date;
    }

    private List<ListArticleResponse.ArticleItem> items;
    private Long total;
}

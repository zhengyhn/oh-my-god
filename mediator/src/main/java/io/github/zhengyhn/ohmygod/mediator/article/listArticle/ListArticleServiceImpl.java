package io.github.zhengyhn.ohmygod.mediator.article.listArticle;

import io.github.zhengyhn.ohmygod.mediator.article.ArticleRepository;
import io.github.zhengyhn.ohmygod.mediator.article.entity.Article;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
public class ListArticleServiceImpl implements IListArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public ListArticleResponse process(ListArticleRequest request) {
        Long total = articleRepository.count();
        Example<Article> example = Example.of(new Article());
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getLimit(),
                Sort.by("date").descending());
        Page<Article> articles = articleRepository.findAll(example, pageable);
        List<ListArticleResponse.ArticleItem> items = articles.stream().map(article -> {
            ListArticleResponse.ArticleItem item = new ListArticleResponse.ArticleItem();
            BeanUtils.copyProperties(article, item);
            return item;
        }).collect(Collectors.toList());
        return ListArticleResponse.builder().items(items).total(total).build();
    }
}

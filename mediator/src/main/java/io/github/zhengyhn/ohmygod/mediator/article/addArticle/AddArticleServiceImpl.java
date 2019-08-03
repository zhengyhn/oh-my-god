package io.github.zhengyhn.ohmygod.mediator.article.addArticle;

import io.github.zhengyhn.ohmygod.mediator.article.ArticleReplyRepository;
import io.github.zhengyhn.ohmygod.mediator.article.ArticleRepository;
import io.github.zhengyhn.ohmygod.mediator.article.entity.Article;
import io.github.zhengyhn.ohmygod.mediator.article.entity.ArticleReply;
import io.github.zhengyhn.ohmygod.mediator.common.EmptyDto;
import io.github.zhengyhn.ohmygod.mediator.generator.GeneratorApi;
import io.github.zhengyhn.ohmygod.mediator.generator.generate.GenerateRequest;
import io.github.zhengyhn.ohmygod.mediator.reply.ReplyRepository;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.PlatformType;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.Reply;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.ReplyStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddArticleServiceImpl implements IAddArticleService {
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private ArticleReplyRepository articleReplyRepository;
    @Autowired
    private GeneratorApi generatorApi;

    @Override
    public EmptyDto process(AddArticleRequest request) {
        this.saveData(request);
        List<Reply> replies = replyRepository.findAllByIds(request.getReplyIds());
        List<GenerateRequest.Item> items = replies.stream().map(reply -> {
            StringBuilder title = new StringBuilder();
            if (reply.getPlatform().equals(PlatformType.NETEASE_COMMENT.toString())) {
                title.append("如何看待");
            }
            title.append(reply.getTitle());
            return GenerateRequest.Item.builder()
                    .title(title.toString())
                    .reply(reply.getReply())
                    .build();
        }).collect(Collectors.toList());

        generatorApi.generateArticle(GenerateRequest.builder().items(items).build());

        return new EmptyDto();
    }

    @Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRED)
    private void saveData(AddArticleRequest request) {
        replyRepository.updateStatusByIds(request.getReplyIds(), ReplyStatus.PUBLISHED.toString());
        Long now = Instant.now().getEpochSecond();
        String date = LocalDate.now().format(DateTimeFormatter.ISO_DATE);
        Article article = Article.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .createdAt(now)
                .updatedAt(now)
                .date(date)
                .build();
        Article insertedArticle = articleRepository.save(article);
        List<ArticleReply> articleReplies = request.getReplyIds().stream().map(id ->
                ArticleReply.builder().articleId(insertedArticle.getId()).replyId(id).build()
        ).collect(Collectors.toList());
        articleReplyRepository.saveAll(articleReplies);
    }
}

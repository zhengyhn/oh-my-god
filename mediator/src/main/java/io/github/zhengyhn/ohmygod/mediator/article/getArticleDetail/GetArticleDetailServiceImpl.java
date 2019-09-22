package io.github.zhengyhn.ohmygod.mediator.article.getArticleDetail;

import io.github.zhengyhn.ohmygod.mediator.article.ArticleReplyRepository;
import io.github.zhengyhn.ohmygod.mediator.article.ArticleRepository;
import io.github.zhengyhn.ohmygod.mediator.article.entity.Article;
import io.github.zhengyhn.ohmygod.mediator.common.BusinessException;
import io.github.zhengyhn.ohmygod.mediator.reply.domain.ReplyFormatter;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.Reply;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Slf4j
public class GetArticleDetailServiceImpl implements IGetArticleDetailService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private ArticleReplyRepository articleReplyRepository;

    @Autowired
    private ReplyFormatter replyFormatter;

    @Override

    public GetArticleDetailResponse process(GetArticleDetailRequest request) {
        Optional<Article> result = articleRepository.findById(request.getArticleId());
        if (!result.isPresent()) {
            throw new BusinessException("Cannot find this article");
        }
        Article article = result.get();
        for (Reply reply : article.getReplies()) {
            reply.setReply(replyFormatter.getFormattedReply(reply.getReply()));
        }
        GetArticleDetailResponse response = new GetArticleDetailResponse();
        BeanUtils.copyProperties(article, response);

        return response;
    }
}

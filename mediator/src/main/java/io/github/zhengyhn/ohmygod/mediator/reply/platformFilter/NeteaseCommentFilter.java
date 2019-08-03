package io.github.zhengyhn.ohmygod.mediator.reply.platformFilter;

import io.github.zhengyhn.ohmygod.mediator.common.BusinessException;
import io.github.zhengyhn.ohmygod.mediator.reply.ReplyRepository;
import io.github.zhengyhn.ohmygod.mediator.reply.addReply.AddReplyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NeteaseCommentFilter implements IPlatformFilter {
    @Autowired
    ReplyRepository replyRepository;

    @Override
    public void checkAndDecorate(AddReplyRequest.ReplyItem item) {
        boolean exists = replyRepository.existsByUrlAndAuthor(item.getUrl(), item.getAuthor());
        if (exists) {
            throw new BusinessException("Reply exists!");
        }
        item.setTitle("如何看待" + item.getTitle());
    }
}

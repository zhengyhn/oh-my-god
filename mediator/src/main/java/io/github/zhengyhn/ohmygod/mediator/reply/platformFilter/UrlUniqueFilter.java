package io.github.zhengyhn.ohmygod.mediator.reply.platformFilter;

import io.github.zhengyhn.ohmygod.mediator.common.BusinessException;
import io.github.zhengyhn.ohmygod.mediator.reply.ReplyRepository;
import io.github.zhengyhn.ohmygod.mediator.reply.addReply.AddReplyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UrlUniqueFilter implements IPlatformFilter {
    @Autowired
    ReplyRepository replyRepository;

    @Override
    public void checkAndDecorate(AddReplyRequest.ReplyItem item) {
        boolean exists = replyRepository.existsByUrl(item.getUrl());
        if (exists) {
            throw new BusinessException("Reply exists!");
        }
    }
}

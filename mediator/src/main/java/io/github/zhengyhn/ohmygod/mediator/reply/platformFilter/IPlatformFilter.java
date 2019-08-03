package io.github.zhengyhn.ohmygod.mediator.reply.platformFilter;

import io.github.zhengyhn.ohmygod.mediator.reply.addReply.AddReplyRequest;

public interface IPlatformFilter {
    void checkAndDecorate(AddReplyRequest.ReplyItem item);
}

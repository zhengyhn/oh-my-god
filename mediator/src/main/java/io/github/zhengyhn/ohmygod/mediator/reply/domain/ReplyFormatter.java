package io.github.zhengyhn.ohmygod.mediator.reply.domain;

import io.github.zhengyhn.ohmygod.mediator.image.getBase64.IGetBase64Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReplyFormatter {
    @Autowired
    private IGetBase64Service getBase64Service;
    private static final String IMAGE_PREFIX = "image[";

    public String getFormattedReply(String reply) {
        StringBuilder replyBuilder = new StringBuilder(reply);
        while (replyBuilder.indexOf(IMAGE_PREFIX) >= 0) {
            int start = replyBuilder.indexOf(IMAGE_PREFIX);
            int end = replyBuilder.indexOf("]", start + IMAGE_PREFIX.length());
            String url = replyBuilder.substring(start + IMAGE_PREFIX.length(), end);
            String base64 = getBase64Service.getBase64ByUrl(url);
            replyBuilder = new StringBuilder(replyBuilder.substring(0, start))
                    .append("\n<image src='data:image/png;base64, ")
                    .append(base64)
                    .append("'></image>")
                    .append(replyBuilder.substring(end + 1));
        }
        return replyBuilder.toString();
    }
}

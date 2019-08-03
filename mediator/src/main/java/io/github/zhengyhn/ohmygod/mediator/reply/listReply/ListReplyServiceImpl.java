package io.github.zhengyhn.ohmygod.mediator.reply.listReply;

import io.github.zhengyhn.ohmygod.mediator.image.getBase64.IGetBase64Service;
import io.github.zhengyhn.ohmygod.mediator.reply.ReplyRepository;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.Reply;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ListReplyServiceImpl implements IListReplyService {
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private IGetBase64Service getBase64Service;

    private static final String IMAGE_PREFIX = "image[";

    @Override
    public ListReplyResponse process(ListReplyRequest request) {
        Example<Reply> example = Example.of(Reply.builder()
                .status(request.getStatus())
                .platform(request.getPlatform())
                .build());
        Long total = replyRepository.count(example);
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getLimit(), Sort.by("updatedAt"));
        Page<Reply> replies = replyRepository.findAll(example, pageable);
        for (Reply reply : replies) {
            reply.setReply(this.getFormattedReply(reply.getReply()));
        }
        List<ListReplyResponse.ReplyItem> items = replies.stream().map(reply -> {
            ListReplyResponse.ReplyItem replyItem = new ListReplyResponse.ReplyItem();
            BeanUtils.copyProperties(reply, replyItem);
            return replyItem;
        }).collect(Collectors.toList());

        return ListReplyResponse.builder().items(items).total(total).build();
    }

    private String getFormattedReply(String reply) {
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

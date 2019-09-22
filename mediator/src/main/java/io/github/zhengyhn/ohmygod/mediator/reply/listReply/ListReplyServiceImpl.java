package io.github.zhengyhn.ohmygod.mediator.reply.listReply;

import io.github.zhengyhn.ohmygod.mediator.reply.ReplyRepository;
import io.github.zhengyhn.ohmygod.mediator.reply.domain.ReplyFormatter;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.Reply;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
public class ListReplyServiceImpl implements IListReplyService {
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private ReplyFormatter replyFormatter;

    @Override
    public ListReplyResponse process(ListReplyRequest request) {
        Example<Reply> example = Example.of(Reply.builder()
                .status(request.getStatus())
                .platform(request.getPlatform())
                .build());
        Long total = replyRepository.count(example);
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getLimit(),
                Sort.by("up").descending());
        Page<Reply> replies = replyRepository.findAll(example, pageable);
        for (Reply reply : replies) {
            log.info(reply.getTitle());
            reply.setReply(replyFormatter.getFormattedReply(reply.getReply()));
        }
        List<ListReplyResponse.ReplyItem> items = replies.stream().map(reply -> {
            ListReplyResponse.ReplyItem replyItem = new ListReplyResponse.ReplyItem();
            BeanUtils.copyProperties(reply, replyItem);
            return replyItem;
        }).collect(Collectors.toList());

        return ListReplyResponse.builder().items(items).total(total).build();
    }
}

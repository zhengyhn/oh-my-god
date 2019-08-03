package io.github.zhengyhn.ohmygod.mediator.reply.addReply;

import io.github.zhengyhn.ohmygod.mediator.common.BusinessException;
import io.github.zhengyhn.ohmygod.mediator.common.EmptyDto;
import io.github.zhengyhn.ohmygod.mediator.reply.ReplyRepository;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.PlatformType;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.Reply;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.ReplyStatus;
import io.github.zhengyhn.ohmygod.mediator.reply.platformFilter.IPlatformFilter;
import io.github.zhengyhn.ohmygod.mediator.reply.platformFilter.PlatformFilterFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class AddReplyServiceImpl implements IAddReplyService {
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private PlatformFilterFactory platformFilterFactory;

    @Override
    public EmptyDto process(AddReplyRequest request) {
        List<Reply> replies = new ArrayList<>(request.getItems().size());
        int i = 0;
        for (AddReplyRequest.ReplyItem item : request.getItems()) {
            IPlatformFilter platformFilter = platformFilterFactory.getPlatformFilter(PlatformType.valueOf(item.getPlatform()));
            try {
                platformFilter.checkAndDecorate(item);
            } catch (BusinessException ex) {
                log.error(ex.getMessage());
                continue;
            }
            Reply reply = new Reply();
            BeanUtils.copyProperties(item, reply);
            reply.setStatus(ReplyStatus.SELECTING.toString());
            Long now = Instant.now().getEpochSecond();
            reply.setCreatedAt(now);
            reply.setUpdatedAt(now);
            replies.add(i++, reply);
        }
        replyRepository.saveAll(replies);

        return new EmptyDto();
    }
}

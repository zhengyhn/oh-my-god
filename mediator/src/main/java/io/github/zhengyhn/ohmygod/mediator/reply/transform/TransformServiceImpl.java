package io.github.zhengyhn.ohmygod.mediator.reply.transform;

import io.github.zhengyhn.ohmygod.mediator.common.BusinessException;
import io.github.zhengyhn.ohmygod.mediator.common.EmptyDto;
import io.github.zhengyhn.ohmygod.mediator.reply.ReplyRepository;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.Reply;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.ReplyStatus;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class TransformServiceImpl implements ITransformService {
    @Autowired
    private ReplyRepository replyRepository;

    @Override
    public EmptyDto process(TransformRequest request) {
        Reply newReply = replyRepository.getOne(request.getId());
        if (newReply == null) {
            throw new BusinessException("Reply not found: " + request.getId());
        }
        newReply.setStatus(request.getStatus());
        replyRepository.save(newReply);

        return new EmptyDto();
    }
}

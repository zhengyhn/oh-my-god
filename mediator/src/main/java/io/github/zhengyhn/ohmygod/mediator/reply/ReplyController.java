package io.github.zhengyhn.ohmygod.mediator.reply;

import io.github.zhengyhn.ohmygod.mediator.common.ResponseResult;
import io.github.zhengyhn.ohmygod.mediator.reply.addReply.AddReplyRequest;
import io.github.zhengyhn.ohmygod.mediator.reply.addReply.IAddReplyService;
import io.github.zhengyhn.ohmygod.mediator.reply.listReply.IListReplyService;
import io.github.zhengyhn.ohmygod.mediator.reply.listReply.ListReplyRequest;
import io.github.zhengyhn.ohmygod.mediator.reply.listReply.ListReplyResponse;
import io.github.zhengyhn.ohmygod.mediator.reply.transform.ITransformService;
import io.github.zhengyhn.ohmygod.mediator.reply.transform.TransformRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Api(description = "Reply management")
public class ReplyController {
    @Autowired
    private IAddReplyService addReplyService;
    @Autowired
    private ITransformService transformService;
    @Autowired
    private IListReplyService listReplyService;

    @PostMapping("/reply/add")
    @ApiOperation(value = "Add replyies")
    public ResponseResult add(@Valid @RequestBody AddReplyRequest addReplyRequest) {
        addReplyService.process(addReplyRequest);
        return new ResponseResult().success();
    }

    @PostMapping("/reply/transform")
    @ApiOperation(value = "Update one reply")
    public ResponseResult transform(@Valid @RequestBody TransformRequest transformRequest) {
        transformService.process(transformRequest);
        return new ResponseResult().success();
    }

    @GetMapping("/reply/list")
    @ApiOperation(value = "list replyies")
    public ResponseResult list(@Valid ListReplyRequest listReplyRequest) {
        ListReplyResponse response = listReplyService.process(listReplyRequest);
        return new ResponseResult().success(response);
    }
}

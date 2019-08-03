package io.github.zhengyhn.ohmygod.mediator.reply.listReply;

import io.github.zhengyhn.ohmygod.mediator.common.aspect.StringEnumeration;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.PlatformType;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.ReplyStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListReplyRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @StringEnumeration(enumClass = PlatformType.class)
    private String platform;

    @StringEnumeration(enumClass = ReplyStatus.class)
    private String status;

    @NotNull
    @Min(1)
    private Integer page;

    @NotNull
    @Max(100)
    private Integer limit;
}

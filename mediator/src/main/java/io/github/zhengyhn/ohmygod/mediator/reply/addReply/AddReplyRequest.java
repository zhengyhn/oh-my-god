package io.github.zhengyhn.ohmygod.mediator.reply.addReply;

import io.github.zhengyhn.ohmygod.mediator.common.aspect.StringEnumeration;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.PlatformType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddReplyRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReplyItem implements Serializable {
        private static final long serialVersionUID = 1L;
        @StringEnumeration(enumClass = PlatformType.class)
        private String platform;
        @NotNull
        private String url;
        @NotNull
        private String title;
        @NotNull
        private String reply;
        @Min(0)
        private Integer up;
        @NotNull
        private String author;
    }

    @NotNull
    @Valid
    private List<ReplyItem> items;
}

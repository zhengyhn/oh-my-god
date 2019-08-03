package io.github.zhengyhn.ohmygod.mediator.reply.listReply;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListReplyResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReplyItem implements Serializable {
        private static final long serialVersionUID = 1L;
        private String platform;
        private String title;
        private String reply;
        private String url;
        private String status;
        private Integer up;
        private Long id;
    }

    private List<ListReplyResponse.ReplyItem> items;
    private Long total;
}

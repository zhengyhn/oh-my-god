package io.github.zhengyhn.ohmygod.mediator.article.getArticleDetail;

import io.github.zhengyhn.ohmygod.mediator.reply.listReply.ListReplyResponse;
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
public class GetArticleDetailResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReplyItem implements Serializable {
        private static final long serialVersionUID = 1L;
        private String title;
        private String reply;
    }

    private List<ListReplyResponse.ReplyItem> replies;
    private Long id;
    private String title;
    private String description;
    private String date;
}

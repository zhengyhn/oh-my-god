package io.github.zhengyhn.ohmygod.mediator.article.getArticleDetail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetArticleDetailRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    private Long articleId;
}

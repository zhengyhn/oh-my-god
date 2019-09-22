package io.github.zhengyhn.ohmygod.mediator.article.listArticle;

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
public class ListArticleRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @Min(1)
    private Integer page;

    @NotNull
    @Max(100)
    private Integer limit;
}

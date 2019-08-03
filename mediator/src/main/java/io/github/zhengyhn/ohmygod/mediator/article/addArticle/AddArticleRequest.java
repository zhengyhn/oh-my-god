package io.github.zhengyhn.ohmygod.mediator.article.addArticle;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddArticleRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    private String title;
    @NotNull
    private String description;
    @Valid
    @Size(min = 1)
    private List<Long> replyIds;
}

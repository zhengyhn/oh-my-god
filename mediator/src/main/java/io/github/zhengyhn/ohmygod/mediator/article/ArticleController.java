package io.github.zhengyhn.ohmygod.mediator.article;

import io.github.zhengyhn.ohmygod.mediator.article.addArticle.AddArticleRequest;
import io.github.zhengyhn.ohmygod.mediator.article.addArticle.IAddArticleService;
import io.github.zhengyhn.ohmygod.mediator.common.ResponseResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Api(description = "Article management")
public class ArticleController {
    @Autowired
    private IAddArticleService addArticleService;

    @PostMapping("/article/add")
    @ApiOperation(value = "Add article")
    public ResponseResult add(@Valid @RequestBody AddArticleRequest addArticleRequest) {
        addArticleService.process(addArticleRequest);
        return new ResponseResult().success();
    }
}

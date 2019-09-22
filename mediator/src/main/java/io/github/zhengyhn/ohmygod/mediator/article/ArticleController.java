package io.github.zhengyhn.ohmygod.mediator.article;

import io.github.zhengyhn.ohmygod.mediator.article.addArticle.AddArticleRequest;
import io.github.zhengyhn.ohmygod.mediator.article.addArticle.IAddArticleService;
import io.github.zhengyhn.ohmygod.mediator.article.getArticleDetail.GetArticleDetailRequest;
import io.github.zhengyhn.ohmygod.mediator.article.getArticleDetail.GetArticleDetailResponse;
import io.github.zhengyhn.ohmygod.mediator.article.getArticleDetail.IGetArticleDetailService;
import io.github.zhengyhn.ohmygod.mediator.article.listArticle.IListArticleService;
import io.github.zhengyhn.ohmygod.mediator.article.listArticle.ListArticleRequest;
import io.github.zhengyhn.ohmygod.mediator.article.listArticle.ListArticleResponse;
import io.github.zhengyhn.ohmygod.mediator.common.ResponseResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Api(description = "Article management")
public class ArticleController {
    @Autowired
    private IAddArticleService addArticleService;
    @Autowired
    private IListArticleService listArticleService;
    @Autowired
    private IGetArticleDetailService getArticleDetailService;

    @PostMapping("/article/add")
    @ApiOperation(value = "Add article")

    public ResponseResult add(@Valid @RequestBody AddArticleRequest addArticleRequest) {
        addArticleService.process(addArticleRequest);
        return new ResponseResult().success();
    }

    @GetMapping("/article/list")
    @ApiOperation(value = "list article")
    public ResponseResult list(@Valid ListArticleRequest listArticleRequest) {
        ListArticleResponse listArticleResponse = listArticleService.process(listArticleRequest);
        return new ResponseResult().success(listArticleResponse);
    }

    @GetMapping("/article/detail")
    @ApiOperation(value = "article detail")
    public ResponseResult list(@Valid GetArticleDetailRequest getArticleDetailRequest) {
        GetArticleDetailResponse getArticleDetailResponse = getArticleDetailService.process(getArticleDetailRequest);
        return new ResponseResult().success(getArticleDetailResponse);
    }
}


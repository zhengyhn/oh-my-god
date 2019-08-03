package io.github.zhengyhn.ohmygod.mediator.image;

import io.github.zhengyhn.ohmygod.mediator.common.ResponseResult;
import io.github.zhengyhn.ohmygod.mediator.image.getBase64.GetBase64Request;
import io.github.zhengyhn.ohmygod.mediator.image.getBase64.GetBase64Response;
import io.github.zhengyhn.ohmygod.mediator.image.getBase64.IGetBase64Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Api(description = "Image management")
public class ImageController {
    @Autowired
    private IGetBase64Service getBase64Service;

    @GetMapping("/image/getBase64")
    @ApiOperation(value = "get image's base64 string")
    public ResponseResult getBase64(@Valid GetBase64Request getBase64Request) {
        GetBase64Response getBase64Response = getBase64Service.process(getBase64Request);
        return new ResponseResult().success(getBase64Response);
    }
}

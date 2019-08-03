package io.github.zhengyhn.ohmygod.mediator.common;

import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(value = "通用返回")
public class ResponseResult<T> implements Serializable {
    public enum ResponseCode {
        SUCCESS(0, "SUCCESS"),
        FAIL(1, "FAIL"),
        UNAUTHORIZED(2, "请重新登录");

        private final Integer code;
        private final String message;

        ResponseCode(int code, String message) {
            this.code = code;
            this.message = message;
        }
        public Integer getValue() {
            return this.code;
        }
        public String getMessage() {
            return this.message;
        }
    }

    @ApiModelProperty(value = "返回码")
    private int code;
    @ApiModelProperty(value = "描述信息")
    private String message;
    @ApiModelProperty(value = "数据")
    private T data;

    public ResponseResult() {}

    public ResponseResult(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public ResponseResult success() {
        this.code = ResponseCode.SUCCESS.getValue();
        this.message = ResponseCode.SUCCESS.name();

        return this;
    }

    public ResponseResult success(T data) {
        this.success();
        this.data = data;

        return this;
    }

    public ResponseResult unAuthorized() {
        this.code = ResponseCode.UNAUTHORIZED.getValue();
        this.message = ResponseCode.UNAUTHORIZED.getMessage();

        return this;
    }

    public JSONObject toJSON() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", this.getCode());
        jsonObject.put("message", this.getMessage());
        jsonObject.put("data", this.getData());

        return jsonObject;
    }
}

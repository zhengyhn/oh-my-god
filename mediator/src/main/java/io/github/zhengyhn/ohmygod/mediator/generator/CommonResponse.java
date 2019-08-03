package io.github.zhengyhn.ohmygod.mediator.generator;

import lombok.Data;

import java.io.Serializable;

@Data
public class CommonResponse<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer code;
    private String message;
    private T data;
}

package io.github.zhengyhn.ohmygod.mediator.common.http;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HttpResult {
    private boolean success;
    private String response;
    private String failMessage;
}

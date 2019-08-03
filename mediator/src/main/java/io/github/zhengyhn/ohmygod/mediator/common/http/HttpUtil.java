package io.github.zhengyhn.ohmygod.mediator.common.http;

import com.alibaba.fastjson.JSON;
import okhttp3.*;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class HttpUtil {
    public static final MediaType MEDIA_TYPE_JSON = MediaType.get("application/json; charset=utf-8");
    private OkHttpClient client;

    public HttpUtil() {
        client = new OkHttpClient();
    }

    public HttpResult get(String url) {
        Request request = new Request.Builder().url(url).build();
        return this.exec(request);
    }

    public HttpResult post(String url, Object json) {
        String jsonString = JSON.toJSONString(json);
        RequestBody body = RequestBody.create(MEDIA_TYPE_JSON, jsonString);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        return this.exec(request);
    }

    private HttpResult exec(Request request) {
        HttpResult httpResult = new HttpResult();
        try {
            Response response = this.client.newCall(request).execute();
            httpResult.setSuccess(true);
            httpResult.setResponse(response.body().string());
        } catch (IOException e) {
            httpResult.setSuccess(false);
            httpResult.setFailMessage(e.getMessage());
        }
        return httpResult;
    }
}

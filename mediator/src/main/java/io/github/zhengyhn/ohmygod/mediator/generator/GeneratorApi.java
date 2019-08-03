package io.github.zhengyhn.ohmygod.mediator.generator;

import io.github.zhengyhn.ohmygod.mediator.generator.generate.GenerateRequest;
import io.github.zhengyhn.ohmygod.mediator.generator.generate.GenerateResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class GeneratorApi {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${api.generator.url}")
    private String url;

    public void generateArticle(GenerateRequest generateRequest) {
        try {
            CommonResponse<GenerateResponse> response = restTemplate.postForObject(
                    url + "/article/generate", generateRequest, CommonResponse.class);
            if (response.getCode() != 0) {
                log.error(response.getMessage());
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}

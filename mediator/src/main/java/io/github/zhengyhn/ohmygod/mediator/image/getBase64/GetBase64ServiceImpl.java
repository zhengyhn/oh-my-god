package io.github.zhengyhn.ohmygod.mediator.image.getBase64;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.URL;
import java.util.Base64;

@Service
@Slf4j
public class GetBase64ServiceImpl implements IGetBase64Service {

    @Override
    public GetBase64Response process(GetBase64Request request) {
        String encodedString = this.getBase64ByUrl(request.getUrl());
        return GetBase64Response.builder().base64(encodedString).build();
    }

    @Override
    public String getBase64ByUrl(String imageUrl) {
        String encodedString = "";
        try {
            URL url = new URL(imageUrl);
            InputStream is = url.openStream();
            byte[] bytes = IOUtils.toByteArray(is);
            encodedString = Base64.getEncoder().encodeToString(bytes);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return encodedString;
    }
}

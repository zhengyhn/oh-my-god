package io.github.zhengyhn.ohmygod.mediator.image.getBase64;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetBase64Response implements Serializable {
    private static final long serialVersionUID = 1L;

    private String base64;
}

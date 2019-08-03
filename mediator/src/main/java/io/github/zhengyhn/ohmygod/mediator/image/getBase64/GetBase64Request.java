package io.github.zhengyhn.ohmygod.mediator.image.getBase64;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetBase64Request implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    private String url;
}

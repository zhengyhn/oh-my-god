package io.github.zhengyhn.ohmygod.mediator.generator.generate;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class GenerateResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private String folder_name;
}

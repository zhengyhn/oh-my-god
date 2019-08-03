package io.github.zhengyhn.ohmygod.mediator.reply.transform;

import io.github.zhengyhn.ohmygod.mediator.common.aspect.StringEnumeration;
import io.github.zhengyhn.ohmygod.mediator.reply.entity.PlatformType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransformRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    private Long id;
    @NotNull
    private String status;
}

package io.github.zhengyhn.ohmygod.mediator.generator.generate;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class GenerateRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @Data
    @Builder
    public static class Item implements Serializable {
        private static final long serialVersionUID = 1L;
        private String title;
        private String reply;
    }

    private List<Item> items;
}

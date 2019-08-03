package io.github.zhengyhn.ohmygod.mediator.reply.platformFilter;

import io.github.zhengyhn.ohmygod.mediator.reply.entity.PlatformType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlatformFilterFactory {
    @Autowired
    private ZhihuFilter zhihuFilter;

    @Autowired
    private NeteaseCommentFilter neteaseCommentFilter;

    public IPlatformFilter getPlatformFilter(PlatformType platformType) {
        switch (platformType) {
            case ZHIHU:
                return zhihuFilter;
            case NETEASE_COMMENT:
                return neteaseCommentFilter;
            default:
                return zhihuFilter;
        }
    }
}

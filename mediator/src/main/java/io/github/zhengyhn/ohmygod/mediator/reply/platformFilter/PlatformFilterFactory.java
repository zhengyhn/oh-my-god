package io.github.zhengyhn.ohmygod.mediator.reply.platformFilter;

import io.github.zhengyhn.ohmygod.mediator.reply.entity.PlatformType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlatformFilterFactory {
    @Autowired
    private UrlUniqueFilter urlUniqueFilter;

    @Autowired
    private NeteaseCommentFilter neteaseCommentFilter;

    public IPlatformFilter getPlatformFilter(PlatformType platformType) {
        switch (platformType) {
            case ZHIHU:
            case BUDEJIE:
            case PENGFU:
                return urlUniqueFilter;
            case NETEASE_COMMENT:
                return neteaseCommentFilter;
            default:
                return urlUniqueFilter;
        }
    }
}

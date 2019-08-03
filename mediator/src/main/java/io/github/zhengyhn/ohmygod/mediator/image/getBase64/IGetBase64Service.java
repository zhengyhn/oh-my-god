package io.github.zhengyhn.ohmygod.mediator.image.getBase64;

import com.alicp.jetcache.anno.CacheType;
import com.alicp.jetcache.anno.Cached;
import io.github.zhengyhn.ohmygod.mediator.common.IService;

import java.util.concurrent.TimeUnit;

public interface IGetBase64Service extends IService<GetBase64Request, GetBase64Response> {
    @Cached(name = "GetBase64Service.getBase64ByUrl", cacheType= CacheType.BOTH, expire = 60 * 60 * 24, timeUnit= TimeUnit.SECONDS, localExpire=50* 60 * 24)
    String getBase64ByUrl(String imageUrl);
}

package io.github.zhengyhn.ohmygod.mediator.common;

public interface IService<T, R> {
    R process(T request);
}

import { ReplyStatus, PlatformType } from "./types";

export default {
  statusOptions: [
    {
      value: ReplyStatus[ReplyStatus.SELECTING],
      label: "待挑选"
    },
    {
      value: ReplyStatus[ReplyStatus.SELECTED],
      label: "好"
    },
    {
      value: ReplyStatus[ReplyStatus.DROPED],
      label: "不好"
    },
    {
      value: ReplyStatus[ReplyStatus.PUBLISHED],
      label: "已发布"
    }
  ],
  platformOptions: [
    {
      value: PlatformType[PlatformType.NETEASE_COMMENT],
      label: '网易跟贴'
    },
    {
      value: PlatformType[PlatformType.ZHIHU],
      label: '知乎'
    }
  ]
};

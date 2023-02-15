/*
 * @Author: 令和唯一
 * @Date: 2023-02-14 16:38:18
 * @LastEditTime: 2023-02-14 17:40:44
 * @LastEditors: 令和唯一
 * @Description:
 * @FilePath: /nmbxd.js/declearation.ts
 * 关注嘉然,顿顿解馋
 */
export enum API {
  CDN_PATH = "/getCDNPath",
  FORUM_LIST = "/getForumList",
  TIME_LINE = "/getTimelineList",
  FORUM_DETAIL = "/showf",
  THREAD = "/thread",
  THREAD_ONLY_PO = "/po",
  GET_REF = "/ref",
  GET_FEED = "/feed",
  ADD_FEED = "/addFeed",
  DEL_FEED = "/delFeed",
  GET_COVER_HTTP_PAGE = "https://nmb.ovear.info/h.php",
  GET_NOTICE_HTTP_PAGE = "GET https://nmb.ovear.info/nmb-notice.json",
  POST_THREAD_HTTP_PAGE = "https://www.nmbxd.com/home/forum/doPostThread.html",
  REPLY_THREAD_HTTP_PAGE = "https://www.nmbxd.com/home/forum/doReplyThread.html",
}

type FormDetail = {
  id: string;
  fgroup?: string;
  sort?: string;
  name: string;
  showName?: string;
  msg: string;
  interval?: string;
  safe_mode?: string;
  auto_delete?: string;
  thread_count?: string;
  permission_level?: string;
  forum_fuse_id?: string;
  createdAt?: string;
  updateAt?: string;
  status?: "n";
};
type FormList = {
  id: string;
  sort: string;
  name: string;
  status: string;
  forums: FormDetail[];
};

type TimeLineInfo = {
  id: number;
  name: string;
  display_name: string;
  notice: string;
  max_page: number;
};

interface FormPost {
  id: number;
  fid: number;
  ReplyCount: number;
  img: string;
  ext: string;
  now: string;
  user_hash: string;
  name: string;
  title: string;
  content: string;
  sage: boolean;
  admin: boolean;
  Hide: boolean;
  Replies?: FormPost[];
}

interface FeedInfo extends FormPost {
  id: number;
  user_id: number;
  fid: number;
  reply_count: number;
  recent_replies: number[];
}

export type TimeLineRes = TimeLineInfo[];
export type FormListRes = FormList[];
export type CDNPathRes = {
  url: string;
  rate: string;
}[];
//查看版面
export type FormDetailRes = FormPost[];
export type FormDetailReq = { id: number; page: 1 | number };
//查看时间线详情
export type TimeLineDetailRes = FormPost[];
export type TimeLineDetailReq = {
  id: number; //timeLine id
  page: 1 | number;
};
//查看串
export type ThreadRes = FormPost[];
export type ThreadReq = { id: number; page: 1 | number };
//查看串 只看po
export type FormDetailOnlyPoRes = FormPost[];
export type FormDetailOnlyPoReq = { id: number; page: 1 | number };
//查看引用
export type RefReq = { id: number };
export type RefRes = FormPost[];
//查看订阅
export type FeedRes = FeedInfo[];
export type FeedReq = { uuid: string; page: 1 | number };
//添加/取消订阅
export type AddFeedReq = { uuid: string; page: 1 | number };
export type AddFeedRes = "订阅大成功→_→" | "该串不存在";
export type DelFeedRes = "取消订阅成功!";
//获取全站提示
export type NoticeRes = {
  content: string;
  date: string;
  enable: boolean;
};
export type CoverRes = Uint8Array;

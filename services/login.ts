/*
 * @Author: 令和唯一
 * @Date: 2023-02-15 10:14:50
 * @LastEditTime: 2023-02-15 14:59:00
 * @LastEditors: 令和唯一
 * @Description:
 * @FilePath: /nmbxd.js/services/login.ts
 * 关注嘉然,顿顿解馋
 */
import { getUserAgent } from "../util/userAgent";
import * as fs from "fs/promises";
import path from "path";
import got from "got";
export const getBarCode = async (ua: string, cookie: string[] | undefined) => {
  const res = await got.get(
    `https://www.nmbxd1.com/Member/User/Index/verify.html?code=${Math.random()}`,
    {
      headers: { "User-Agent": ua, Cookie: cookie },
    }
  );
  await fs.writeFile(
    path.join(__dirname, "..", "public", "barcode.jpg"),
    res.rawBody
  );
  return true;
};
const getLoginCookie = async (ua: string) => {
  const res = await got.get(
    "https://www.nmbxd1.com/Member/User/Index/login.html",
    {
      headers: { "User-Agent": ua },
    }
  );
  return res.headers["set-cookie"];
};

const doLogin = async (
  email: string,
  password: string,
  verify: string,
  ua: string,
  cookie: string[] | undefined
) => {
  return await got.post("https://www.nmbxd1.com/Member/User/Index/login.html", {
    form: { email, password, verify },
    headers: { "User-Agent": ua, Cookie: cookie },
  });
};

export class Login {
  cookie: string[] | undefined;
  username: string = "";
  password: string = "";
  barcode: string = "";
  ua = getUserAgent();
  getCookie = async () => {
    this.cookie = await getLoginCookie(this.ua);
    return this;
  };
  getBarCode = async () => {
    await getBarCode(this.ua, this.cookie);
    return this;
  };
  setLoginInfo = (username: any, password: any, barcode: any) => {
    (this.username = username), (this.password = password);
    this.barcode = barcode;
    return this;
  };
  login = async () => {
    const loginInfo = await doLogin(
      this.username,
      this.password,
      this.barcode,
      this.ua,
      this.cookie
    );
    return {
      success: loginInfo.body.includes("登陆成功"),
      cookie: loginInfo.headers["set-cookie"],
    };
  };
  cookieList = async () => {
    const cookieListOrigin = await got.get(
      "https://www.nmbxd1.com/Member/User/Cookie/index.html",
      {}
    );
  };
}

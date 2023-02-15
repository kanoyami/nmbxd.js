/*
 * @Author: 令和唯一
 * @Date: 2023-02-15 10:14:50
 * @LastEditTime: 2023-02-15 16:34:52
 * @LastEditors: 令和唯一
 * @Description:
 * @FilePath: /nmbxd.js/services/login.ts
 * 关注嘉然,顿顿解馋
 */
import { getUserAgent } from "../util/userAgent";
import * as fs from "fs/promises";
import path from "path";
import got from "got";
import * as cheerio from "cheerio";
export const getVerifyCode = async (
  ua: string,
  cookie: string[] | undefined
) => {
  const res = await got.get(
    `https://www.nmbxd1.com/Member/User/Index/verify.html?code=${Math.random()}`,
    {
      headers: { "User-Agent": ua, Cookie: cookie },
    }
  );
  await fs.writeFile(
    path.join(__dirname, "..", "public", "VerifyCode.jpg"),
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
  VerifyCode: string = "";
  cookieHash: any = {};
  ua = getUserAgent();
  getCookie = async () => {
    this.cookie = await getLoginCookie(this.ua);
    return this;
  };
  getVerifyCode = async () => {
    await getVerifyCode(this.ua, this.cookie);
    return this;
  };
  setLoginInfo = (username: any, password: any, VerifyCode: any) => {
    (this.username = username), (this.password = password);
    this.VerifyCode = VerifyCode;
    return this;
  };
  login = async () => {
    const loginInfo = await doLogin(
      this.username,
      this.password,
      this.VerifyCode,
      this.ua,
      this.cookie
    );
    const success = loginInfo.body.includes("登陆成功");
    console.log(success);
    if (success)
      this.cookie![0] =
        this.cookie![0] + ";" + loginInfo.headers["set-cookie"]![0];
    return success;
  };
  cookieList = async () => {
    const cookieListOrigin = await got.get(
      "https://www.nmbxd1.com/Member/User/Cookie/index.html",
      {
        headers: { "User-Agent": this.ua, Cookie: this.cookie },
      }
    );
    const $ = cheerio.load(cookieListOrigin.body);
    const trList = $("tr").toArray();
    for (let i = 1; i < trList.length; i += 1) {
      const tdArr = $(trList[i]).find("td").toArray();
      this.cookieHash[$(tdArr[2]).text()] = await this.switchCookie(
        $(tdArr[1]).text()
      );
    }
  };

  switchCookie = async (cookieId: string) => {
    console.log(cookieId);
    const switchOrigin = await got.get(
      `https://www.nmbxd1.com/Member/User/Cookie/switchTo/id/${cookieId}.html`,
      { headers: { "User-Agent": this.ua, Cookie: this.cookie } }
    );
    const success = switchOrigin.body.includes("成功");
    if (success) {
      const setCookieArr: string[] =
        switchOrigin.headers["set-cookie"]![0].split(";");
      for (const setCookie of setCookieArr) {
        console.log(setCookie);
        if (setCookie.includes("userhash")) return setCookie.split("=")[1];
      }
    } else return false;
  };
}

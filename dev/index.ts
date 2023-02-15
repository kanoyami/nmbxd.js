/*
 * @Author: 令和唯一
 * @Date: 2023-02-15 11:37:25
 * @LastEditTime: 2023-02-15 16:27:53
 * @LastEditors: 令和唯一
 * @Description:
 * @FilePath: /nmbxd.js/dev/index.ts
 * 关注嘉然,顿顿解馋
 */

import inquirer from "inquirer";
import { Login } from "../services/login";

(async () => {
  const loginStep = new Login();
  await loginStep.getCookie();
  await loginStep.getVerifyCode();
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "your email:",
    },
    {
      type: "input",
      name: "password",
      message: "your password",
    },
    {
      type: "input",
      name: "verify",
      message: "your verify",
    },
  ]);
  loginStep.setLoginInfo(answers.name, answers.password, answers.verify);
  const res = await loginStep.login();
  await loginStep.cookieList();
  const swCookie = await inquirer.prompt([
    {
      type: "list",
      name: "选择饼干",
      choices: Object.keys(loginStep.cookieHash).map((e) => ({ name: e })),
    },
  ]);
  console.log(swCookie, loginStep.cookieHash[swCookie["选择饼干"]]);
})();

/*
 * @Author: 令和唯一
 * @Date: 2023-02-15 11:37:25
 * @LastEditTime: 2023-02-15 14:30:38
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
  await loginStep.getBarCode();
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "your name:",
    },
    {
      type: "input", // 类型（数字）
      name: "password",
      message: "your password",
    },
    {
      type: "input", // 类型（数字）
      name: "verify",
      message: "your verify",
    },
  ]);
  loginStep.setLoginInfo(answers.name, answers.password, answers.verify);
  const res = await loginStep.login();
  console.log(res.body);
})();

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
const ACCESS_AUTHORIZATION_CODE = "ACCESS_AUTHORIZATION_CODE";
import nookies from "nookies";

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  save(access_token, ctx = null) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, access_token);
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, access_token);
    nookies.set(ctx, ACCESS_TOKEN_KEY, access_token, {
      maxAge: ONE_YEAR,
      path: "/",
    });
  },
  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || "";
    //return globalThis?.localStorage?.getItem(ACCESS_TOKEN_KEY);
  },
  retrieve(ctx = null) {
    const cookies = nookies.get(ctx);

    const encodedToken = cookies[ACCESS_AUTHORIZATION_CODE] || "";
    console.log(encodedToken);
    const decodedToken = Buffer.from(encodedToken, "base64").toString("utf-8");

    const jsonObject = JSON.parse(decodedToken);
    const token = jsonObject.message;

    nookies.destroy(ctx, ACCESS_AUTHORIZATION_CODE);

    return token;
  },
  delete(ctx = null) {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY);
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN_KEY);
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  },
};

//auth0.com/docs/quickstart/webapp/nextjs/interactive
import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

const logoutUrl = [
  `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?`,
  `client_id=${process.env.AUTH0_CLIENT_ID}`,
  `&returnTo=${process.env.AUTH0_BASE_URL}`,
];


export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE, // or AUTH0_IDENTIFIER
      // Add the `offline_access` scope to also get a Refresh Token
      scope: "openid profile email offline_access",
    },
    returnTo: "/",
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/",
  }),
  logout: handleLogout({
    returnTo: logoutUrl.join(""),
  }),
});

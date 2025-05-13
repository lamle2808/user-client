import "../styles/Forgot.scss";
import { toast } from "react-toastify";

import { useState } from "react";
const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/account/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();

      if (data.errorCode !== undefined) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="forgot-pass">
      <div className="subscribe">
        <p>Forget Password</p>
        <input
          placeholder="Your e-mail"
          className="subscribe-input"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="submit-btn" onClick={handleResetPassword}>
          SUBMIT
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;

import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const signInwithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(
      "🚀 ~ file: LoginPage.tsx:8 ~ signInwithGoogle ~ result",
      result
    );
    navigate("/");
  };

  return (
    <div>
      <div>
        <p>Sign in with your google account to continue</p>
      </div>

      <button onClick={signInwithGoogle}>Sign in with Google </button>
    </div>
  );
}

export default LoginPage;

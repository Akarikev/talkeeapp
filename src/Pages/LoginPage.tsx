import React from "react";
import { auth, provider } from "../config/firebase";
import {
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  // const signInwithGoogle = async () => {
  //   const result = await signInWithPopup(auth, provider);
  //   console.log(
  //     "🚀 ~ file: LoginPage.tsx:8 ~ signInwithGoogle ~ result",
  //     result
  //   );
  //   navigate("/");
  // };

  const signInAnonymous = async () => {
    const res = await signInAnonymously(auth);

    navigate("/");
    console.log("��� ~ file: LoginPage.tsx:9 ~ signInAnonymous ~ res", res);
  };

  return (
    <div>
      <div>
        <p className="react">Sign anonymously to continue</p>
      </div>

      {/* <button onClick={signInwithGoogle}>Sign in with Google </button> */}

      <button onClick={signInAnonymous}>Anonymously Sign In</button>
      <p className="names">
        Note, if you sign in anonymously, your anonymous account will be deleted
        after 30 days, please read our privacy policy for more details{" "}
      </p>
    </div>
  );
}

export default LoginPage;

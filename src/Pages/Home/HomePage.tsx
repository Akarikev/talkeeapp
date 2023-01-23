import React, { useEffect } from "react";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import Talks from "./Talks";
import Homescreen from "./Homescreen";

export interface talksProps {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

function HomePage() {
  const [user] = useAuthState(auth);
  const talkRef = collection(db, "post");
  const [talkList, setTalkList] = useState<talksProps[] | null>(null);

  const getTalk = async () => {
    const data = await getDocs(talkRef);
    setTalkList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as talksProps[]
    );
  };

  useEffect(() => {
    getTalk();
  }, []);

  return (
    <div>
      <div>
        <h4 className="userNames">
          {" "}
          {!user
            ? "Hello, Welcome to Talkee 🎉"
            : "Hello, " + user?.displayName + "🎉"}{" "}
        </h4>
        {!user ? (
          <Homescreen />
        ) : (
          talkList?.map((talk) => <Talks talk={talk} />)
        )}
      </div>
    </div>
  );
}

export default HomePage;

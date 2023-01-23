import React, { useEffect } from "react";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import Talks from "./Talks";

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
      <h4> {user && "Hello, " + user.displayName} </h4>
      <div>
        {talkList?.map((talk) => (
          <Talks talk={talk} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

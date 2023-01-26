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

const allowedEmoji = [
  ..."✌",
  "😂",
  "😝",
  "😁",
  "😱",
  "👉",
  "🙌",
  "🍻",
  "🔥",
  "🌈",
  "☀",
  "🎈",
  "🌹",
  "💄",
  "🎀",
  "⚽",
  "🎾",
  "🏁",
  "😡",
  "👿",
  "🐻",
  "🐶",
  "🐬",
  "🐟",
  "🍀",
  "👀",
  "🚗",
  "🍎",
  "💝",
  "💙",
  "👌",
  "❤",
  "😍",
  "😉",
  "😓",
  "😳",
  "💪",
  "💩",
  "🍸",
  "🔑",
  "💖",
  "🌟",
  "🎉",
  "🌺",
  "🎶",
  "👠",
  "🏈",
  "⚾",
  "🏆",
  "👽",
  "💀",
  "🐵",
  "🐮",
  "🐩",
  "🐎",
  "💣",
  "👃",
  "👂",
  "🍓",
  "💘",
  "💜",
  "👊",
  "💋",
  "😘",
  "😜",
  "😵",
  "🙏",
  "👋",
  "🚽",
  "💃",
  "💎",
  "🚀",
  "🌙",
  "🎁",
  "⛄",
  "🌊",
  "⛵",
  "🏀",
  "🎱",
  "💰",
  "👶",
  "👸",
  "🐰",
  "🐷",
  "🐍",
  "🐫",
  "🔫",
  "👄",
  "🚲",
  "🍉",
  "💛",
  "💚",
];
export const printEmoj = [...allowedEmoji][
  Math.floor(Math.random() * allowedEmoji.length)
];

var a = [
  "small",
  "blue",
  "ugly",
  "jack",
  "wicked",
  "super",
  "red",
  "green",
  "Yellow",
  "badass",
  "cultural",
];
var b = [
  "bear",
  "dog",
  "banana",
  "pool",
  "john",
  "man",
  "orange",
  "super",
  "68",
  "drunk",
  "vult",
];

var rA = Math.floor(Math.random() * a.length);
var rB = Math.floor(Math.random() * b.length);
export var usersname: string = a[rA] + b[rB];
localStorage.setItem("tempUser", usersname);

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
      {user ? <h1 className="vite2">Talkee 🎉🎊</h1> : ""}
      <div>
        <h4 className="userNames">
          {" "}
          {!user
            ? "Hello, Welcome to Talkee 🎉"
            : "Hello, " + usersname + " " + printEmoj}{" "}
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

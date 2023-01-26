import React, { useEffect, useState } from "react";
import { talksProps } from "./HomePage";
import { useNavigate } from "react-router-dom";
import { usersname } from "./HomePage";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  talk: talksProps;
}

interface Like {
  userId: string;
  likeId: string;
}

interface Laugh {
  userId: string;
  laughId: string;
}

interface Cool {
  userId: string;
  coolsId: string;
}

interface Skeleton {
  userId: string;
  skelId: string;
}

function Talks(props: Props) {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const [laugh, setLaugh] = useState<Laugh[] | null>(null);
  const [cool, setCool] = useState<Cool[] | null>(null);
  const [skeleton, setSkeleton] = useState<Skeleton[] | null>(null);
  const { talk } = props;
  const [user] = useAuthState(auth);

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const getSkeleton = async () => {
    const data = await getDocs(skeletonDoc);
    setSkeleton(
      data.docs.map((doc) => ({ userId: doc.data().userId, skelId: doc.id }))
    );
  };

  const getCools = async () => {
    const data = await getDocs(coolDoc);
    setCool(
      data.docs.map((doc) => ({ userId: doc.data().userId, coolsId: doc.id }))
    );
  };

  const getLaughs = async () => {
    const data = await getDocs(laughDoc);
    setLaugh(
      data.docs.map((doc) => ({ userId: doc.data().userId, laughId: doc.id }))
    );
  };

  useEffect(() => {
    getLaughs();
    getLikes();
    getCools();
  }, []);

  const likesRef = collection(db, "likes");
  const laughsRef = collection(db, "laugh");
  const skeletonRef = collection(db, "skeleton");
  const skeletonDoc = query(skeletonRef, where("talkId", "==", talk.id));
  const coolRef = collection(db, "cool");
  const likesDoc = query(likesRef, where("talkId", "==", talk.id));
  const coolDoc = query(likesRef, where("talkId", "==", talk.id));
  const laughDoc = query(laughsRef, where("talkId", "==", talk.id));

  //? add like
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        talkId: talk.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  //! add skeleto emoji count
  const addSkeleton = async () => {
    try {
      const newDoc = await addDoc(skeletonRef, {
        userId: user?.uid,
        talkId: talk.id,
      });

      if (user) {
        setSkeleton((prev) =>
          prev
            ? [...prev, { userId: user.uid, skelId: newDoc.id }]
            : [{ userId: user.uid, skelId: newDoc.id }]
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  //? add laugh emoji
  const addLaughs = async () => {
    try {
      const newDoc = await addDoc(laughsRef, {
        userId: user?.uid,
        talkId: talk.id,
      });
      if (user) {
        setLaugh((prev) =>
          prev
            ? [...prev, { userId: user.uid, laughId: newDoc.id }]
            : [{ userId: user.uid, laughId: newDoc.id }]
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  //? add cool emoji

  const addCool = async () => {
    try {
      const newDoc = await addDoc(coolRef, {
        userId: user?.uid,
        talkId: talk.id,
      });
      if (user) {
        setCool((prev) =>
          prev
            ? [...prev, { userId: user.uid, coolsId: newDoc.id }]
            : [{ userId: user.uid, coolsId: newDoc.id }]
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  //? remove like
  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("talkId", "==", talk.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;

      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);

      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  //? remove laugh
  const removeLaugh = async () => {
    try {
      const laughToDeleteQuery = query(
        laughsRef,
        where("talkId", "==", talk.id),
        where("userId", "==", user?.uid)
      );
      const laughToDeleteData = await getDocs(laughToDeleteQuery);
      const laughId = laughToDeleteData.docs[0].id;

      const laughToDelete = doc(db, "laugh", laughId);
      await deleteDoc(laughToDelete);

      if (user) {
        setLaugh(
          (prev) => prev && prev.filter((laugh) => laugh.laughId !== laughId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  //? remove cool
  const removeCool = async () => {
    try {
      const coolToDeleteQuery = query(
        coolRef,
        where("talkId", "==", talk.id),
        where("userId", "==", user?.uid)
      );
      const coolToDeleteData = await getDocs(coolToDeleteQuery);
      const coolsId = coolToDeleteData.docs[0].id;

      const coolToDelete = doc(db, "cool", coolsId);
      await deleteDoc(coolToDelete);

      if (user) {
        setCool(
          (prev) => prev && prev.filter((cools) => cools.coolsId !== coolsId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  //!remove skeleton emoji count
  const removeSkeleton = async () => {
    try {
      const skelToDeleteQuery = query(
        skeletonRef,
        where("talkId", "==", talk.id),
        where("userId", "==", user?.uid)
      );
      const skelToDeleteData = await getDocs(skelToDeleteQuery);
      const skelId = skelToDeleteData.docs[0].id;

      const skelToDelete = doc(db, "skeleton", skelId);
      await deleteDoc(skelToDelete);

      if (user) {
        setSkeleton(
          (prev) => prev && prev.filter((skels) => skels.skelId !== skelId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userLiked = likes?.find((like) => like.userId === user?.uid);
  const userLaugh = laugh?.find((laugh) => laugh.userId === user?.uid);
  const userCool = cool?.find((cools) => cools.userId === user?.uid);
  const userSkeleton = skeleton?.find(
    (skeleton) => skeleton.userId === user?.uid
  );

  let username = localStorage.getItem("tempUser");
  return (
    <div className="talks">
      <div className="title">
        <h2>{talk.title}</h2>
      </div>

      <div className="body">
        <p>{talk.description}</p>
      </div>

      <div className="footer">
        <p>
          @{talk.username}
          {/* @{user?.isAnonymous ? (username ? username : "anonymous user") : ""} */}
        </p>

        <button onClick={userLiked ? removeLike : addLike}>
          {userLiked ? <>👎</> : <>👍</>}{" "}
          {likes && (
            <code className="names">{likes?.length ? likes.length : ""}</code>
          )}
        </button>
        <button onClick={userLaugh ? removeLaugh : addLaughs}>
          😂{" "}
          {laugh && (
            <code className="names">{laugh?.length ? laugh.length : ""}</code>
          )}
        </button>
        <button onClick={userCool ? removeCool : addCool}>
          😎 <code className="names">{cool?.length ? cool?.length : ""}</code>
        </button>
        <button onClick={userSkeleton ? removeSkeleton : addSkeleton}>
          💀{" "}
          <code className="names">
            {skeleton?.length ? skeleton.length : ""}
          </code>
        </button>
        {/* <button>🥰</button>
        <button>😗</button>
        <button>😐</button> */}
      </div>
    </div>
  );
}

export default Talks;

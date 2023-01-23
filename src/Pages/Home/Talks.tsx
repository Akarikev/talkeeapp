import React, { useEffect, useState } from "react";
import { talksProps } from "./HomePage";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { filter } from "lodash";

interface Props {
  talk: talksProps;
}

interface Like {
  userId: string;
  likeId: string;
}
function Talks(props: Props) {
  const [likes, setLikes] = useState<Like[] | null>(null);

  const { talk } = props;

  const [user] = useAuthState(auth);

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  useEffect(() => {
    getLikes();
  }, []);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("talkId", "==", talk.id));

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

  const userLiked = likes?.find((like) => like.userId === user?.uid);

  return (
    <div>
      <div className="title">
        <h2>{talk.title}</h2>
      </div>

      <div className="body">
        <p>{talk.description}</p>
      </div>

      <div className="footer">
        <p>@{talk.username}</p>
        <button onClick={userLiked ? removeLike : addLike}>
          {userLiked ? <>👎</> : <>👍</>}
        </button>

        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </div>
  );
}

export default Talks;

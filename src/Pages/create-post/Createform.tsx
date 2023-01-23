import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface createFormData {
  title: string;
  description: string;
  numOfLike: number;
}

function Createform() {
  const schema = yup.object().shape({
    title: yup.string().required("Your post should have a title"),
    description: yup
      .string()
      .required("just make your post description, vivid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createFormData>({
    resolver: yupResolver(schema),
  });

  const talkRef = collection(db, "post");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const oncreateTalk = async (data: createFormData) => {
    await addDoc(talkRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
      numOfLikes: data.numOfLike || 0,
    });
    navigate("/");

    console.log(data);
  };
  return (
    <div className="post-form">
      <form onSubmit={handleSubmit(oncreateTalk)}>
        <input
          type="text"
          placeholder="Title... ex. The New Iphone 14"
          {...register("title")}
        />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <textarea
          rows={10}
          cols={30}
          placeholder="Description... The new iphone 14 is so cool"
          {...register("description")}
        />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
        <input type="submit" value="Submit" />
        <br />
      </form>
    </div>
  );
}

export default Createform;

import { useNavigate } from "react-router-dom";

function Homescreen() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };
  return (
    <div>
      <h1 className="vite">Talkee 🎉🎊</h1>

      <p className="react">
        Post your feels, and share your thoughts about your feels!🎉🎈 Join the
        new community, by logging in{" "}
        <code style={{ color: "red" }}>
          ANONYMOUSLY! 🥷🏾 everythin' stays here!
        </code>
      </p>

      <div className="box2">
        <h3 className="titled">The New feels app!🎉</h3>
        <p>
          post your feels on the new feels app, let your friends like your feels
        </p>
        <p className="names">@talkeeapp</p>
        <button>👍</button>
        <p className="names">Likes: 2M</p>
      </div>
      <br />
      <div className="box">
        <h3 className="titled">New Jordans</h3>
        <p>The new Jordans are amazing just got them stocked up!</p>
        <p className="names">@superman</p>
        <button>👍</button>
        <p className="names">Likes: 2k</p>
      </div>

      <br />
      <br />
      <div className="box3">
        <h3 className="titled">NEW SINGLE OUT NOW!</h3>
        <p>listen to my new single out on all platforms!</p>
        <p className="names">@anonymous user</p>
        <button>👍</button>
        <p className="names">Likes: 205k</p>
      </div>

      <div className="box2">
        <h3 className="titled">The New feels app!🎉</h3>
        <p>
          post your feels on the new feels app, let your friends like your feels
        </p>
        <p className="names">@proudbanana</p>
        <button>👍</button>
        <p className="names">Likes: 2M</p>
      </div>

      <div>
        <p className="names">Create your feels the way you want it!</p>
        <p className="names">
          nobody gonna know its you! you're anonymous! 🐱‍💻
        </p>
      </div>

      <div>
        <p className="names"> SIGN IN NOW! to get started</p>
      </div>

      <div>
        <button className="titled" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
      <br />
      <div>
        <code>
          App is in <span className="names">beta development,</span> meaning,
          some few things might break!😭, i hope you'd enjoy this little project
          of mine.🎁
        </code>
      </div>
      <br />
      <footer className="names">
        <code>&copy; 2023, Talkee.app +233 208 448 895</code>
        <br />
        <a
          target="_blank"
          href="https://www.privacypolicytemplate.net/live.php?token=wblbzfsezxEQCzCuRvpDm28b1ZjmNXDm"
          style={{ color: "blue" }}
        >
          Privacy Policy
        </a>
      </footer>
    </div>
  );
}

export default Homescreen;

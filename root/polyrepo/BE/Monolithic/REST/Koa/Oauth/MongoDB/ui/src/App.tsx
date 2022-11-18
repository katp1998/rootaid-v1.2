import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    async function getMe() {
      await axios
        .get("http://localhost:4000/auth/me", {
          withCredentials: true,
        })
        .then((res) => setMe(res.data));
    }

    getMe();
  }, []);

  if (me) {
    return <p>hi {JSON.stringify(me)}</p>;
  }

  return (
    <div className="App">
      <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth%2Fgoogle&client_id=752891200536-96a9n0puua8l48im0l2ks2jbu18h8he8.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email">
        LOGIN WITH GOOGLE
      </a>
    </div>
  );
}

export default App;

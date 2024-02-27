import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "@/lib/firebase/init";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const auth = getAuth(app);

    const user = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
          errorCode,
          errorMessage,
        };
      });

    if (user.errorCode != null) {
      res.status(500).json({ status: 500, message: user.errorMessage });
    }

    const userMetada = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      tokenManager: user.stsTokenManager,
    };

    res
      .status(200)
      .json({ status: 200, message: "Success Login", metadata: userMetada });
  }

  if (req.method === "GET") {
    res.status(200).json({ status: 200 });
  }
}

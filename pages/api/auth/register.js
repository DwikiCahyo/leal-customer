import {
  getFirestore,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import app from "@/lib/firebase/init";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth();

async function checkUsername(username) {
  const q = query(collection(db, "user"), where("username", "==", username));
  const userSnapshot = await getDocs(q);
  const userExist = userSnapshot.docs.map((user) => user.data().username);
  return userExist;
}

export default async function handler(req, res) {
  const { nama, username, noTelp, email, password } = req.body;
  const newUser = {
    nama: nama,
    username: username,
    noTelp: noTelp,
    email: email,
    createdAt: Timestamp.now(),
  };

  if (req.method === "POST") {
    //checking username exist or not
    const usernameExist = await checkUsername(username);
    if (usernameExist.length > 0) {
      return res
        .status(501)
        .json({ status: 501, message: `username ${username} already exist` });
    }

    //add account on firebase authentication
    const userSignUp = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
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

    //return error when add data in authcnetiocation
    if (userSignUp.errorCode != null) {
      res.status(500).json({
        status: 500,
        message: userSignUp.errorMessage,
      });
    }

    try {
      return await setDoc(doc(db, "user", userSignUp.uid), {
        ...newUser,
        userID: userSignUp.uid,
      })
        .then(() => {
          res.status(200).json({
            status: 200,
            message: "Success add new user",
            metadata: {
              userID: userSignUp.uid,
              ...newUser,
            },
          });
        })
        .catch((error) => {
          res.status(500).json({
            status: 500,
            message: error,
          });
        });
    } catch (error) {
      if (error instanceof FirebaseError) {
        res
          .status(500)
          .json({ status: 500, message: "Error add user on database" });
      }
    }
  }
}

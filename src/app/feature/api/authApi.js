import { apiStore } from "./apiSlice";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, provider } from "../../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { handleFirebaseAuthErrors } from "../../../firebase/firebaseError";

export const authApi = apiStore.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      queryFn: async (data) => {
        try {
          const { userName, email, password } = data;

          await createUserWithEmailAndPassword(auth, email, password).then(
            async (data) => {
              const user = data.user;
              const userRef = doc(db, "users", user.uid);

              updateProfile(user, {
                displayName: userName,
              });

              setDoc(userRef, {
                id: user.uid,
                displayName: userName,
                email: user.email,
                dateJoin: new Date(),
              });
            }
          );
          return { data: "Ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),
    login: builder.mutation({
      queryFn: async (user) => {
        try {
          const { email, password } = user;

          await signInWithEmailAndPassword(auth, email, password);

          return { data: "Ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),
    signOut: builder.mutation({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: "Ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),
    signInWithGoogle: builder.mutation({
      queryFn: async () => {
        try {
          await signInWithPopup(auth, provider).then(async (data) => {
            const user = data.user;
            const userRef = doc(db, "users", user.uid);

            await setDoc(userRef, {
              id: user.uid,
              displayName: user.displayName,
              email: user.email,
              dateJoin: new Date(),
            });
          });
          return { data: "Ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),
    resetPass: builder.mutation({
      queryFn: async (mail) => {
        try {
          await sendPasswordResetEmail(auth, mail);

          return { data: "Ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);

          return { error };
        }
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useSignOutMutation,
  useSignInWithGoogleMutation,
  useResetPassMutation,
} = authApi;

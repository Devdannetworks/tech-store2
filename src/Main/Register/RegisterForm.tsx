import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import HeadersComp from "../../Components/Headers";
import Input from "../../Components/Inputs/Input";
import { useState } from "react";
import ButtonComp from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords don't match");
    }

    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (result) => {
        toast.success("Account created successfully");
        navigate("/ShoppingCartComponent");

        try {
          await setDoc(doc(db, "users", result.user.uid), {
            name: data.name,
            email: data.email,
            password: data.password, // Consider hashing the password before storing it
            role: "user",
            createdAt: serverTimestamp(), // Call serverTimestamp to get the timestamp
          });
          console.log("User saved to Firestore with UID:", result.user.uid);
        } catch (error) {
          console.error("Error saving user with email and password", error);
        }
      })
      .catch((err) => {
        const errorCode = (err as { code: string }).code;
        switch (errorCode) {
          case "auth/email-already-in-use":
            toast.error("Email already in use");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email address");
            break;
          case "auth/operation-not-allowed":
            toast.error("Operation not allowed");
            break;
          case "auth/weak-password":
            toast.error("Weak password");
            break;
          case "auth/network-request-failed":
            toast.error("Network error, please try again");
            break;
          default:
            toast.error("Registration failed");
            console.error("Unhandled error:", err);
        }
      });
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true);

    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(async (result) => {
      toast.success("Account created successfully");
      navigate("/ShoppingCartComponent");

      try {
        await setDoc(doc(db, "users", result.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
          role: "user",
          photo: result.user.photoURL,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        const errorCode = (error as { code: string }).code;
        switch (errorCode) {
          case "auth/account-exists-with-different-credential":
            toast.error(
              "An account already exists with the same email address but different sign-in credentials."
            );
            break;
          case "auth/cancelled-popup-request":
            toast.error("Popup request was canceled.");
            break;
          case "auth/popup-blocked":
            toast.error("Popup was blocked by the browser please try again.");
            break;
          case "auth/popup-closed-by-user":
            toast.error(
              "Popup was closed by the user before finalizing the operation."
            );
            break;
          case "auth/network-request-failed":
            toast.error("Network error, please try again");
            break;
          default:
            toast.error("Google sign-in failed");
        }
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  return (
    <>
      <HeadersComp label="Sign up to E-com shop" />
      <hr className="bg-slate-300 w-full h-px" />

      <ButtonComp
        outline
        onClick={handleSignInWithGoogle}
        icon={AiOutlineGoogle}
        label="Sign in with Google"
      />
      <Input
        id="name"
        label="Name"
        type="text"
        required
        errors={errors}
        register={register}
        disabled={loading}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        required
        errors={errors}
        register={register}
        disabled={loading}
      />
      <Input
        id="tel"
        label="Phone number"
        type="number"
        required
        errors={errors}
        register={register}
        disabled={loading}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        required
        errors={errors}
        register={register}
        disabled={loading}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        required
        errors={errors}
        register={register}
        disabled={loading}
      />

      <ButtonComp
        label={loading ? "Loading..." : "Sign up"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account{" "}
        <Link to="/LogIn" className="underline">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;

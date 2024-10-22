import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import HeadersComp from "../../Components/Headers";
import Input from "../../Components/Inputs/Input";
import { useState } from "react";
import ButtonComp from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { handleSignInWithEmailAndPassword } from "../../Actions/Authentication/Auth";
import toast from "react-hot-toast";

const LogInForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    console.log("Submitting data:", data);

    const { userCredentials, error } = await handleSignInWithEmailAndPassword(
      data.email,
      data.password
    );

    if (userCredentials) {
      toast.success("Successfully Logged-in");
      navigate("/ShoppingCartComponent");
      setLoading(false);
    } else if (error) {
      console.error("Login error:", error);

      switch (error) {
        case "auth/wrong-password":
          toast.error("Incorrect password");
          break;
        case "auth/user-not-found":
          toast.error("No user found with this email");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;
        case "auth/user-disabled":
          toast.error("User account is disabled");
          break;
        case "auth/network-request-failed":
          toast.error("Network error, please try again");
          break;
        case "auth/invalid-credential":
          toast.error("Invalid credentials");
          break;
        case "auth/too-many-requests":
          toast.error("Too many requests, try again later");
          break;
        default:
          toast.error("Sign-in failed");
      }
    } else {
      toast.error("Sign-in failed");
    }
    setLoading(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <HeadersComp label="Log in to E-com shop" />
      <hr className="bg-slate-300 w-full h-px" />
      <form className="w-full flex flex-col gap-4">
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
          id="password"
          label="Pasword"
          type="password"
          required
          errors={errors}
          register={register}
          disabled={loading}
        />

        <ButtonComp
          label={loading ? "Loading..." : "Log in"}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
      <p className="text-sm">
        Don`t have an account{" "}
        <Link to="/Register" className="underline">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LogInForm;

"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import RegisterButton from "./components/RegisterButton";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";
import { useRouter } from "next/navigation";

const page = () => {
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isHuman, setIsHuman] = useState<boolean>(false);
  const captchaRef = useRef(null);
  const router = useRouter();
  //Defining the Schema
  const RegistrationSchema = z.object({
    username: z
      .string()
      .max(30, "Username must be no longer than 30 characters"),
    email: z.string(),
    password: z
      .string()
      .min(8, "Must be at least 8 characters in length")
      .regex(
        new RegExp(".*[A-Z].*"),
        "At least one upper case letter must contain"
      )
      .regex(
        new RegExp(".*[a-z].*"),
        "At least one lower case letter must contain"
      )
      .regex(new RegExp(".*\\d.*"), "At least one number must contain")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "At least one special character must contain"
      ),
  });
  type Registration = z.infer<typeof RegistrationSchema>; //inferring type with zod schema (it cannot be assigned type to the formData Object yet)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userCredentials = Object.fromEntries(formData); // [['username','value'],['email','value'],['password','value']] ===> {username: 'value',email: 'value',password: 'value}
    if (
      !userCredentials.username ||
      !userCredentials.email ||
      !userCredentials.password
    ) {
      //usename require condition
      if (!userCredentials.username) {
        setErrorMessage({ ...errorMessage, username: "Username is required" });
      } else {
        setErrorMessage({ ...errorMessage, username: "" });
      }

      //email require condition
      if (!userCredentials.email) {
        setErrorMessage((prev) => {
          return { ...prev, email: "Email is required" };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, email: "" };
        });
      }
    } else {
      // clean up the error message when the user input is not empty
      setErrorMessage({
        username: "",
        email: "",
        password: "",
      });
    }
    const schemaValidResult = RegistrationSchema.safeParse(userCredentials);

    if (!schemaValidResult.success) {
      const errorInputField = schemaValidResult.error.issues[0].path[0]; // retrieving the error of the first input field (maybe --> 'username','email','password')
      const toShowMessage = schemaValidResult.error.issues[0].message;
      if (errorInputField === "username") {
        setErrorMessage((prev) => {
          return { ...prev, username: toShowMessage };
        });
      } else if (errorInputField === "password") {
        if (userCredentials.password === "") {
          setErrorMessage((prev) => {
            return { ...prev, password: "Password is required" };
          });
        } else {
          setErrorMessage((prev) => {
            return { ...prev, password: toShowMessage };
          });
        }
      }
    } else if (schemaValidResult.success) {
      fetch(
        `http://localhost:5000/api/send-email-verification?email=${userCredentials.email}`,
        {
          method: "POST",
        }
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          router.push(
            `/sign-up/verify-email?username=${userCredentials.username}&email=${userCredentials.email}&password=${userCredentials.password}`
          );
        });
    }
  };
  const handleRecaptcha = async (token: string | null) => {
    try {
      if (token) {
        const response = await fetch("http://localhost:3000/sign-up/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        data.success && setIsHuman(true);
      }
    } catch (error) {
      console.log("Recapture Error: " + error);
      setIsHuman(false);
    }
  };

  return (
    <div className="font-[family-name:var(--font-geist-mono)] h-[100vh] flex">
      <div className="w-[500px] m-auto border p-8 rounded-md shadow-md">
        <div className="text-center">
          <h1 className="font-bold text-lg">Welcome From Sign-up Page</h1>
        </div>
        <div className="mt-7">
          <form
            id="registerForm"
            className="flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col">
              <p className="text-sm">Username</p>
              <input
                type="text"
                name="username"
                className="border p-2 hover:border-black mt-2"
                placeholder="Enter your name"
              />
              <span className="text-red-500 text-sm">
                {errorMessage.username}
              </span>
            </div>
            <div className="w-full flex flex-col mt-4">
              <p className="text-sm">Email</p>
              <input
                type="email"
                name="email"
                className="border p-2 hover:border-black mt-2"
                placeholder="Enter your email"
              />
              <span className="text-red-500 text-sm w-[450px]">
                {errorMessage.email}
              </span>
            </div>
            <div className="w-full flex flex-col mt-4">
              <p className="text-sm">Password</p>
              <input
                type="password"
                name="password"
                className="mt-3 border p-2 hover:border-black"
                placeholder="Enter your password"
              />
              <span className="text-red-500 text-sm">
                {errorMessage.password}
              </span>
              <div className="text-sm mt-2">
                <p className="cursor-pointer hover:underline w-[150px]">
                  {" "}
                  Forget password?
                </p>
              </div>
              <RegisterButton id="registerBtn" isHuman={isHuman} />
            </div>
          </form>
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="/login" replace className="archivo-font text-black">
            <p className="text-sm cursor-pointer hover:underline">
              Already have a mango account? Log in
            </p>{" "}
          </Link>
        </div>
        <div className="mt-5 flex justify-center w-full">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTURE_SITE_KEY as string}
            onExpired={() => {
              setIsHuman(false);
            }}
            onChange={handleRecaptcha}
            ref={captchaRef}
            size="normal"
          />
        </div>
      </div>
    </div>
  );
};

export default page;

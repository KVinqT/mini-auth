"use client";
import React, { useState } from "react";
import LoginButton from "./components/LoginButton";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";

const page = () => {
  const [isHuman, setIsHuman] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  const LoginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email format" }),
    password: z.string().min(8, "Please enter a valid password"),
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userCredentials = Object.fromEntries(formData);
    if (!userCredentials.email || !userCredentials.password) {
      //email require condition
      if (!userCredentials.email) {
        setErrorMessage((prev) => {
          return { ...prev, email: "Email should not be empty" };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, email: "" };
        });
      }
    } else {
      // clean up the error message when the user input is not empty
      setErrorMessage({
        email: "",
        password: "",
      });
    }
    const schemaValidResult = LoginSchema.safeParse(userCredentials);
    if (!schemaValidResult.success) {
      const errorInputField = schemaValidResult.error.issues[0].path[0]; // retrieving the error of the first input field (maybe --> 'username','email','password')
      const toShowMessage = schemaValidResult.error.issues[0].message;
      if (errorInputField === "password") {
        if (userCredentials.password === "") {
          setErrorMessage((prev) => {
            return { ...prev, password: "Password should not be empty" };
          });
        } else {
          setErrorMessage((prev) => {
            return { ...prev, password: toShowMessage };
          });
        }
      }
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
      <div className="min-w-[500px] m-auto border p-8 rounded-md shadow-md">
        <div className="text-center">
          <h1 className="font-bold text-xl">Please Login To Account</h1>
        </div>
        <div className="mt-10">
          <form
            id="registerForm"
            className="flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col mt-6">
              <p>Email</p>
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
            <div className="w-full flex flex-col mt-6">
              <p>Password</p>
              <input
                type="password"
                name="password"
                className="mt-3 border p-2 hover:border-black"
                placeholder="Enter your password"
              />
              <span className="text-red-500 text-sm">
                {errorMessage.password}
              </span>
              <div className="text-sm mt-3">
                <p className="cursor-pointer hover:underline w-[150px]">
                  {" "}
                  Forget password?
                </p>
              </div>
              <LoginButton id="registerBtn" isHuman={isHuman} />
            </div>
          </form>
        </div>
        <div className="mt-5 flex justify-center">
          <Link href="/login" replace className="archivo-font text-black">
            <p className="text-sm cursor-pointer hover:underline">
              Do not have any account yet? Sign-up
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
            size="normal"
          />
        </div>
      </div>
    </div>
  );
};

export default page;

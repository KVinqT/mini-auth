"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import RegisterButton from "./components/RegisterButton";
import ReCAPTCHA from "react-google-recaptcha";

const page = () => {
  const [isHuman, setIsHuman] = useState<boolean>(false);
  const captchaRef = useRef(null);
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const email = formData.get("email");
  //   const password = formData.get("password");
  //   const userCredentials = { email, password };
  // };
  const handleRecaptcha = async (token: string | null) => {
    try {
      if (token) {
        console.log("Start Fetching with token: " + token);

        const response = await fetch("http://localhost:3000/sign-up/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        data.success && setIsHuman(true);
        console.log("Data from client", data);
        console.log(captchaRef.current);
      }
    } catch (error) {
      console.log("Error: " + error);
      setIsHuman(false);
    }
  };
  return (
    <div className="font-[family-name:var(--font-geist-mono)] h-[100vh] flex">
      <div className="min-w-[500px] m-auto border p-8 rounded-md shadow-md">
        <div className="text-center">
          <h1 className="font-bold text-2xl">Welcome From Sign-up Page</h1>
          <p className="mt-3">Register for an account!</p>
        </div>
        <div className="mt-10">
          <form id="registerForm" className="flex flex-col">
            <div className="w-full flex flex-col">
              <p>Email</p>
              <input
                type="email"
                name="email"
                className="border p-2 hover:border-black mt-2"
                placeholder="Enter your email"
              />
            </div>
            <div className="w-full flex flex-col mt-6">
              <p>Password</p>
              <input
                type="password"
                name="password"
                className="mt-3 border p-2 hover:border-black"
                placeholder="Enter your password"
              />
              <div className="text-sm mt-3">
                <p className="cursor-pointer hover:underline w-[150px]">
                  {" "}
                  Forget password?
                </p>
              </div>
              <RegisterButton id="registerBtn" isHuman={isHuman} />
            </div>
          </form>
        </div>
        <div className="mt-5 flex justify-center">
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

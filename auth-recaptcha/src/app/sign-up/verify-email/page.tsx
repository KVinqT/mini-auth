"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  const [toVerifyCode, setToVerifyCode] = useState<string>("");
  const [verifyFailMessage, setVerifyFailMessage] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const user_name = searchParams.get("username");
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  const handleOnVerify = () => {
    //sending request to the server api
    const response = fetch("http://localhost:5000/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, email, password, toVerifyCode }),
    });
    response
      .then((data) => {
        if (data.status === 404) {
          console.log(`Server error with status ${data.status}`);
          return data.json();
        } else if (data.status === 200) {
          return data.status;
        }
      })
      .then((data) => {
        if (data === 200) {
          console.log("data from server", data);
          router.replace("/welcome");
        } else {
          setVerifyFailMessage(data.message);
        }
      });
  };
  return (
    <div className="font-[family-name:var(--font-geist-mono)] h-[100vh] flex">
      <div className="min-w-[500px] m-auto border p-8 rounded-md shadow-md">
        <div className="text-center">
          <h1 className="font-bold text-xl">Enter the verification codes</h1>
        </div>
        <div className="mt-6">
          <input
            type="text"
            name="verifyCode"
            className="text-center mt-3 border p-4 w-full hover:border-black"
            placeholder="Enter verification code"
            onChange={(e) => {
              setToVerifyCode(e.target.value);
            }}
          />
          <span className="text-red-500 text-sm">{verifyFailMessage}</span>
          <button
            onClick={handleOnVerify}
            className="mt-5 w-full bg-black hover:bg-black/70 archivo-font text-white rounded-sm p-2"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;

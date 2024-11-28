"use client";
import { auth, onAuthStateChanged } from "@/firebase/firebaseApp";
import React, { useState } from "react";

const page = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  onAuthStateChanged(auth, (user) => {
    if (userEmail === "" && user?.emailVerified) {
      setUserEmail(user?.email as string);
    }
  });

  return (
    <div className="font-[family-name:var(--font-geist-mono)] h-[100vh]">
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="">Welcome From Kvin's App</h1>
        <h3>User's email - {userEmail}</h3>
      </div>
    </div>
  );
};

export default page;

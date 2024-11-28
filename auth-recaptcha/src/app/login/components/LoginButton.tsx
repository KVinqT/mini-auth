import React from "react";

const LoginButton = ({ id, isHuman }: { id: string; isHuman: boolean }) => {
  return (
    <>
      <button
        className={`${
          !isHuman ? "cursor-not-allowed" : "cursor-pointer"
        } mt-5 w-full bg-black hover:bg-black/70 archivo-font text-white rounded-sm p-2`}
        id={id}
        disabled={!isHuman}
      >
        Login
      </button>
    </>
  );
};

export default LoginButton;

"use client";

import { Form } from "@components";
import { PageTypeContext } from "@context";
import { useContext } from "react";

export default function Registration() {
  const pageTypeContext = useContext(PageTypeContext);
  const isRegistered = pageTypeContext.pageType === "Registered";

  return (
    <div className="h-svh px-4">
      {isRegistered && (
        <div className="border border-red-300 w-full max-w-[300px] p-4 rounded-md flex justify-center items-center gap-3 absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2">
          <p>Already registered!</p>
          <a
            href="/login"
            className="text-xl underline underline-offset-2"
          >
            Login
          </a>
        </div>
      )}
      <Form title={"Register"} />
    </div>
  );
}

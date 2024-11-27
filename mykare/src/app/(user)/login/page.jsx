"use client";

import { Form } from "@components";
import { PageTypeContext } from "@context";
import { useContext } from "react";

export default function Login() {
  const pageTypeContext = useContext(PageTypeContext);
  const isInvalid = pageTypeContext.pageType === "invalid";
  return (
    <div className="h-svh">
      {isInvalid && (
        <div className="border border-red-300 w-full max-w-[300px] p-4 rounded-md flex justify-center items-center gap-3 absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2">
          <p>Invalid Credentials!</p>
        </div>
      )}
      <Form title={"Login"} />
    </div>
  );
}

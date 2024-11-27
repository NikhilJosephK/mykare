"use client";

import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();
  function removeSession() {
    sessionStorage.removeItem("session");
    router.push("/login");
  }

  return (
    <div>
      <button
        type="button"
        onClick={removeSession}
      >
        Logout
      </button>
    </div>
  );
}

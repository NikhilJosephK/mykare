"use client";

import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();
  function removeSession() {
    document.cookie =
      "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

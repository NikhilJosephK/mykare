"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePathname, useRouter } from "next/navigation";

let key = 0;
let obj = {};

export function Form({ title }) {
  const router = useRouter();
  const path = usePathname();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    let getUserList;
    if (localStorage.getItem("mk-user")) {
      getUserList = JSON.parse(localStorage.getItem("mk-user"));
      let userEmailList = Object.values(getUserList);
      key = userEmailList.length;
      let isRegistered = userEmailList.find((item) => {
        return item.email === data.email;
      });
      if (path === "/registration" && isRegistered) {
        return;
      } else if (
        path === "/login" &&
        isRegistered?.email === data?.email &&
        isRegistered?.password === data?.password
      ) {
        const userProfileInfo = JSON.stringify(data);
        document.cookie = `session=${userProfileInfo}`;
        sessionStorage.setItem("session", userProfileInfo);
        router.push("/profile");
        return;
      } else if (
        path === "/login" &&
        (isRegistered?.email !== data?.email ||
          isRegistered?.password !== data?.password)
      ) {
        return;
      }
    }

    key++;
    obj = { ...getUserList };
    obj[key] = { ...data };
    const user = JSON.stringify(obj);
    localStorage.setItem("mk-user", user);
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form
        className="flex flex-col gap-2 max-w-96 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-6">{title}</h1>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="p-2 rounded-md text-black"
            {...register("email")}
          />
          <p className="text-red-400">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="p-2 rounded-md text-black"
            {...register("password")}
          />
          <p className="text-red-400">{errors.password?.message}</p>
        </div>

        <button
          className="bg-red-400 p-2 rounded-md mt-5"
          type="submit"
        >
          {title}
        </button>
      </form>
    </div>
  );
}

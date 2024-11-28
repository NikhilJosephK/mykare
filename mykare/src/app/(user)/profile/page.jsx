import { cookies } from "next/headers";
import Button from "./button";

export default function Profile() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");

  let userName = "user";
  if (sessionCookie) {
    const myCookie = JSON.parse(sessionCookie.value);
    userName = myCookie.email.slice(0, myCookie.email.indexOf("@"));
  }

  return (
    <div className="h-screen w-screen">
      <div className="bg-indigo-700 w-full h-full p-28 flex items-center justify-center">
        <div className="max-w-3xl flex h-full m-4 md:m-6">
          <div className="relative group sm:w-full md:w-1/2 hover:bg-indigo-800 border-t border-l border-b border-r md:border-r-0 bg-opacity-5 transition-all duration-300">
            <nav>
              <ul className="flex p-4 md:p-6 space-x-6 text-white">
                <li className="cursor-pointer">Platform</li>
                <li className="cursor-pointer">Services</li>
                <li className="cursor-pointer">
                  <Button />
                </li>
              </ul>
            </nav>
            <h1 className="pl-4 md:pl-8 mt-6 md:mt-8 text-2xl text-white  transform group-hover:translate-x-6 duration-300 uppercase leading-snug">
              Welcome
              <br /> {userName}
            </h1>
            <div className="absolute z-50 bottom-32 md:bottom-10 right-0 transform translate-x-12 flex items-center justify-center w-24 h-24 rounded-full bg-white group-hover:bg-green-200 text-indigo-800 group-hover:text-white font-semibold cursor-pointer group-hover:scale-110 duration-300 select-none">
              Start Now!
            </div>
          </div>
          <div className="md:w-1/2 hidden md:block bg-indigo-700">
            <img
              src="https://www.reshot.com/preview-assets/illustrations/CK5DAW8L9T/world-health-day-illustration-CK5DAW8L9T-w600.jpg"
              alt="mobile payment"
              className="h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

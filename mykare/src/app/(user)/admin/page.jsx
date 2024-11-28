"use client";

export default function Admin() {
  const resgiteredUserDetails =
    typeof window !== "undefined" && localStorage.getItem("mk-user")
      ? Object.values(JSON.parse(localStorage.getItem("mk-user")))
      : [];

  return (
    <section>
      <div className="bg-white py-6 mb-6">
        <h1 className="text-black text-center font-bold text-4xl">
          Admin Panel
        </h1>
      </div>
      <div className="grid  gap-4 px-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {resgiteredUserDetails.map((item) => {
          return (
            <div
              className="border border-red-400 rounded-lg p-5"
              key={item.email}
            >
              <p className="mb-3">
                User :<br /> {item?.email}
              </p>
              <p>{item?.password}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

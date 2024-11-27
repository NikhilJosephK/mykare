import Button from "./button";

export default function RootLayout({ children }) {
  return (
    <div>
      <Button />
      {children}
    </div>
  );
}

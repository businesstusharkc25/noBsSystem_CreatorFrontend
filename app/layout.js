"use client";
import { useState } from "react";
import { AppSideBar, AppWrapper } from "../components";
import "../styles/index.scss";
import { useScreenSize } from "../utils/hooks";

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { width } = useScreenSize();

  return (
    <html>
      <head></head>
      <body className="main">
        <section className="flex">
          <AppWrapper>
            <AppSideBar open={open} setOpen={setOpen} />
            <div
              className={`w-[100%] ${width < 720 && open ? "hidden" : "block"}`}
            >
              {children}
            </div>
          </AppWrapper>
        </section>
      </body>
    </html>
  );
}

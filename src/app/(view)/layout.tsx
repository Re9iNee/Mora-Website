import React from "react";
import Header from "./Frames/Header";
import Footer from "./Frames/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='max-w-screen-xl mx-auto'>{children}</div>
      <Footer />
    </>
  );
}

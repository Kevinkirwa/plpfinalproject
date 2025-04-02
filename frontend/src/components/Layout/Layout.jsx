import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatAssistant from "../ChatAssistant/ChatAssistant";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Layout; 
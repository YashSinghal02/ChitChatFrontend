import React from "react";
import { Routes, Route } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const {authUser,isLoading,login,isLogin}=useAuthStore()
  console.log("AuthUser:",authUser)
  console.log("isLoading:",isLoading)
  console.log("login:",login)
  console.log("isLogin",isLogin)
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">


       {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f8f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" ></div>
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" ></div>
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" ></div>

      <button onClick={login} className="z-10 text-red-200">Login</button>


      <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
    </div>
  );
}

export default App;

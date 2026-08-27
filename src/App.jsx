import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";
import "./css/MainAppBg.css";
import MainPageLoader from "./components/MainPageLoader";
import PageNotFound from "./components/PageNotFound";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log({authUser});

  if (isCheckingAuth) {
    return <MainPageLoader/>
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden mainbg">
      <Routes>

        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound/>} />

      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

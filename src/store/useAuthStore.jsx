import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://chitchatbackend-p92m.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignup: false,
  isLogin: false,
  isUpdating: false,
  socket: null,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSignup: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isSignup: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLogin: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      console.log("Login Error:", error);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successfully");
      get().disconnectSocket();
    } catch (error) {
      console.log("Logout Error:", error);
      toast.error("Error logging out");
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdating: true });
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Update profile Error:", error);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUpdating: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    // creates a Socket.IO connection to your backend.
    const socket = io(BASE_URL, {
      withCredentials: true, // this ensures cookies are sent with the connection
    });
    // connection establish
    socket.connect();
    // initially it is just the initial/empty value and replaces that empty value with the actual connection.
    set({ socket: socket });

    // listen for online user
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    // if is socket is conncted then only disconnect it
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
// selectedUser :User to which we select and chat
// authUser :User who logged in

// get() allows that function to access the latest/current Zustand state

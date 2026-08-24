import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignup: false,
  isLogin: false,
  isUpdating: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
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
      set({ authUser:null});
      toast.success("Logout successfully");
    } catch (error) {
      console.log("Logout Error:",error);
      toast.error("Error logging out")
    }
  },

updateProfile :async (data) => {
  try {
    set({ isUpdating: true})
    const res=await axiosInstance.put("/auth/update-profile",data);
    set({authUser:res.data})
    toast.success("Profile Updated Successfully")
  } catch (error) {
    console.log("Update profile Error:",error);
    toast.error(error.response?.data?.message);
  }
  finally{
    set({ isUpdating: false})
  }
}

}));

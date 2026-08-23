import { create } from "zustand"


export const useAuthStore = create((set) =>({
    authUser:{name:"Jhon",_id:123,age:25},
    isLoading:false,
    isLogin:false,
    login:()=>{
  console.log("We logged in:");
  set({isLogin:true})
    }
}))

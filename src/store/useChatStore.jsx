import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore=create((set,get)=>({
allContacts:[],
// Partners to whom we chat
chats:[],
messages:[],
activeTab:"chats",
isUserLoading:false,
isMessageLoading:false,
isSoundEnabled:localStorage.getItem("isSoundEnabled") === true,

toggleSound:()=>{
    localStorage.setItem("isSoundEnabled",!get().isSoundEnabled);
    set({isSoundEnabled:!get().isSoundEnabled})
},
// Active tab should be chats or contacts 
setActiveTab:(tab)=>set({activeTab:tab}),
setSelctedUser:(selectedUser)=>set({selectedUser:selectedUser}),

getAllContacts:async () => {
    try {
        set({isUserLoading:true});
        const res=await axiosInstance.get("/message/contacts");
        set({allContacts:res.data});
    } catch (error) {
        console.log("GetAll Contacts Error:",error);
        toast.error(error.response?.data?.message)
    }
    finally{
        set({isUserLoading:false});

    }

},

getMyChatPartners:async () => {
    try {
        set({isUserLoading:true});
        const res=await axiosInstance.get("/message/chats");
        set({chats:res.data});

    } catch (error) {
        console.log("Chat Partners Errors:",error);
        toast.error(error.response?.data?.message)
    }
    finally{
        set({isUserLoading:false});

    }
},

}))
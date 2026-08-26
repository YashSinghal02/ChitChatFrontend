import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore=create((set,get)=>({
allContacts:[],
// Partners to whom we chat
chats:[],
messages:[],
activeTab:"chats",
isUserLoading:false,
isMessageLoading:false,
// string true never equal to boolean true
isSoundEnabled:JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

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


getMessagesByUserId:async(userId)=>{
try {
    set({isMessageLoading:true})
    const res=await axiosInstance.get(`/message/${userId}`);
    set({messages:res.data})
} catch (error) {
    console.log("Get MessagesByUserId Error:",error)
    toast.error(error?.response?.data?.message || "Something Went Wrong")
}
finally{
    set({isMessageLoading:false})
}
},


sendMessage: async (messagedata) => {
    // I use an optimistic update to immediately update the UI whenever the user sends a message. For that, I create a temporary message with a temporary ID and display it immediately in the UI without waiting for the server response. Meanwhile, the message is sent to the server and saved in the database. Once the server successfully responds, I replace the temporary message with the real message returned by the server. If the request fails, I remove the temporary message and show an error
    const {selectedUser,messages}=get();
    const { authUser } = useAuthStore.getState();;
    const tempId=`temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messagedata.text,
      image: messagedata.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] })
    try {
        const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messagedata);
        // old messages are remembered and the new message is added
        // without concat old messages are removed from the messages state.
        set({messages:messages.concat(res.data)});
    } catch (error) {
        // if server reject the request tehn error is shown
        set({messages:messages})
        console.log("sendMessages Error:",error);
        toast.error(error?.response?.data?.message || "Something went wrong")
    }
},

// 
subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");

        notificationSound.currentTime = 0; // reset to start
        notificationSound.play().catch((e) => console.log("Audio play failed:", e));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },


}))

// selectedUser :User to which we select and chat 
// authUser :User who logged in 
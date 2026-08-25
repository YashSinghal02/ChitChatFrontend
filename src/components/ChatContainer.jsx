import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistory from "./NoChatHistory";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const { getMessagesByUserId, isMessageLoading, messages, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef=useRef(null);

  // scroll 
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);



  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessageLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              // daisu ui
              // chat-end  send message on right side
              // chat-start receive message on right side
              return (
                <div
                  key={msg._id}
                  className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble relative ${
                      msg.senderId === authUser._id
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover"
                      />
                    )}
                    {msg.text && <p className="mt-2">{msg.text}</p>}
                     <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  </div>
                </div>
              );
            })}
            {/* to reove manually scroll when new message is send */}
            <div ref={messageEndRef}/>


          </div>
        ) : 
        isMessageLoading ? <MessagesLoadingSkeleton/> :
        (
          <NoChatHistory name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput/>
    </>
  );
}

export default ChatContainer;

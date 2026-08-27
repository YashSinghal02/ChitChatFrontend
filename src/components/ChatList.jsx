import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import NoSearchResults from "./NoSearchResults";

function ChatList({ search }) {
  const { getMyChatPartners, isUserLoading, chats, setSelctedUser } = useChatStore();
  const filteredChats = chats.filter((chat) =>
  chat.fullName?.toLowerCase().includes(search.toLowerCase())
);
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUserLoading) {
    return <UsersLoadingSkeleton />;
  }

 if (chats.length === 0) {
  return <NoChatsFound />;
}

if (search && filteredChats.length === 0) {
  return <NoSearchResults/>;
}

  return (
    <>
      {filteredChats.map((chat) => (
        <div
          key={chat._id}
          className="p-3 rounded-full cursor-pointer hover:bg-[#2d2154d8] transition-colors hover:rounded-full"
          onClick={() => setSelctedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* here we use the socket to fix online status */}
            <div
              className={`avatar`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
              <span
          className={`absolute top-0 right-0 size-3 z-10 rounded-full border-2 border-[#15121f] ${
            onlineUsers.includes(chat._id)
              ? "bg-green-500"
              : "bg-slate-400"
          }`}
        />
            </div>
            <h4 className="text-[#F8FAFC] font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatList;

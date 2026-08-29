import { useState } from "react";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import NoConversationContainer from "../components/NoConversationContainer";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const [search, setSearch] = useState("");

  return (
    <div className="relative w-full max-w-6xl h-[100dvh] sm:h-[660px] px-0 sm:px-4">
      <div className="w-full h-full rounded-2xl sm:rounded-2xl border flex overflow-hidden border-white/30">

        {/* Left Side (sidebar) */}
        <div
          className={`
            w-full md:w-72 flex-col
            bg-[linear-gradient(to_right,#00000099,#00000080)] backdrop-blur-[10px]
            border-r border-white/10
            ${selectedUser ? "hidden md:flex" : "flex"}
          `}
        >
          {/* Logo */}
          <div className="p-4 border-b border-slate-700/50">
            <img
              src="/logo.png"
              alt="logo"
              className="w-32 sm:w-40 h-auto object-contain"
            />
          </div>

          <ProfileHeader />
          <ActiveTabSwitch search={search} setSearch={setSearch} />

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === "chats" ? (
              <ChatList search={search} />
            ) : (
              <ContactList search={search} />
            )}
          </div>
        </div>

        {/* Right Side (chat) */}
        <div
          className={`
            flex-1 flex-col
            bg-[linear-gradient(to_right,#000000b0,#00000082)] backdrop-blur-[10px]
            border-r border-white/10
            ${selectedUser ? "flex" : "hidden md:flex"}
          `}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationContainer />}
        </div>

      </div>
    </div>
  );
}

export default ChatPage;
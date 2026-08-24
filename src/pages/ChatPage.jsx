import ActiveTabSwitch from "../components/ActiveTabSwitch";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import NoConversationContainer from "../components/NoConversationContainer";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";

function ChatPage() {
  const{activeTab,selectedUser}=useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>

        {/* Left Side */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col ">

        <ProfileHeader/>
        <ActiveTabSwitch/>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === "chats" ? <ChatList/>: <ContactList/>}
        </div>

        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col  bg-slate-900/50 backdrop-blur-sm ">
        {selectedUser? <ChatContainer/> : <NoConversationContainer/>}

        </div>

      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
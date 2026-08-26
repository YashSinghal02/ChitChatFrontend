import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";


function ChatHeader() {
  const { selectedUser, setSelctedUser } = useChatStore();
  const {onlineUsers}=useAuthStore();
  const isOnline=onlineUsers.includes(selectedUser._id)

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelctedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelctedUser]);

  return (
    <div className="flex justify-between items-center bg-[#111827]/80 border-b border-slate-700/50 max-h-[75px] px-6 flex-1">
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ?"online" : "offline"} `}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt="selectedUser.fullName"
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium">
            {selectedUser.fullName}
          </h3>
          <p className="text-slate-200 text-xs">{isOnline ?"online" : "offline"}</p>
        </div>
      </div>

      <button onClick={() => setSelctedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}

export default ChatHeader;

import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="w-16 h-16 bg-[#533993]/50 border border-[#533993]/60 rounded-full flex items-center justify-center">
        <MessageCircleIcon className="w-8 h-8 text-[#7153d3]" />
      </div>
      <div>
        <h4 className="text-slate-200 font-medium mb-1">No conversations yet</h4>
        <p className="text-slate-400 text-sm px-6">
          Select a contact to start a new conversation.
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-4 py-2 text-sm text-white bg-[#583ead8f] rounded-lg hover:bg-[#624bae8d] transition-colors duration-200 "
      >
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;
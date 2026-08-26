import { MessageCircleIcon } from "lucide-react";

const NoChatHistory = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-16 h-16 bg-[#745dc059] rounded-full flex items-center justify-center mb-5">
        <MessageCircleIcon className="size-8 text-[#704fdc]" />
      </div>
      <h3 className="text-lg font-medium text-slate-200 mb-3">
        Start your conversation with {name}
      </h3>
      <div className="flex flex-col space-y-3 max-w-md mb-5">
        <p className="text-slate-400 text-sm">
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button className="px-4 py-2 text-xs font-medium text-white bg-[#785ece59] rounded-full hover:bg-[#5132b859] transition-colors">
          👋 Say Hello
        </button>
        <button className="px-4 py-2 text-xs font-medium text-white bg-[#785ece59] rounded-full hover:bg-[#5132b859]transition-colors">
          🤝 How are you?
        </button>
        <button className="px-4 py-2 text-xs font-medium text-white bg-[#785ece59] rounded-full hover:bg-[#5132b859] transition-colors">
          💬 Let's chat!
        </button>
      </div>
    </div>
  );
};

export default NoChatHistory;
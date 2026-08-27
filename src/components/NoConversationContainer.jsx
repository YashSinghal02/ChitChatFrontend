import { MessageCircleIcon } from "lucide-react";

const NoConversationContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-20 bg-[#533993]/50 border border-[#533993]/60 rounded-full flex items-center justify-center mb-6">
        <MessageCircleIcon className="size-10 text-[#704fdc]" />
      </div>
      <h3 className="text-xl font-semibold text-slate-200 mb-2">
        Select a conversation
      </h3>
      <p className="text-slate-400 max-w-md">
        Choose a contact from the sidebar to start a new conversation or
        continue an existing one.
      </p>
    </div>
  );
};

export default NoConversationContainer;

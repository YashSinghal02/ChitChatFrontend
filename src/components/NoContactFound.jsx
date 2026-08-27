import { UsersRound } from "lucide-react";

function NoContactFound() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#533993]/50 border border-[#533993]/60 mb-4">
        <UsersRound size={28} className="text-[#9b7bea]" />
      </div>

      <h3 className="text-slate-200 font-medium">
        No contacts found
      </h3>

      <p className="text-sm text-slate-400 mt-1 max-w-xs">
        There are no contacts available to chat with yet.
      </p>
    </div>
  );
}

export default NoContactFound;
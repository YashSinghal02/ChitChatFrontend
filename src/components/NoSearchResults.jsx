import { UserRoundSearch } from "lucide-react";

function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#533993]/50 border border-[#533993]/60 mb-4">
        <UserRoundSearch
          size={28}
          className="text-[#9b7bea]"
        />
      </div>

      <h3 className="text-slate-200 font-medium">
        No users found
      </h3>

      <p className="text-sm text-slate-400 mt-1">
        Try searching with a different name.
      </p>
    </div>
  );
}

export default NoSearchResults;
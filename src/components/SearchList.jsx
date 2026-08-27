import { Search } from "lucide-react";
import useKeyBoardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";


function SearchList({ search, setSearch }) {
    const { playRandomSound } = useKeyBoardSound();
    const {isSoundEnabled } = useChatStore();
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => {setSearch(e.target.value) 
            isSoundEnabled && playRandomSound()}
        }
        placeholder="Search users..."
        className="w-full pl-11 pr-4 py-2 rounded-full bg-[#111827]/80 border border-slate-700/50 text-white placeholder:text-slate-400 outline-none focus:border-[#533993] transition-colors duration-300"
      />
    </div>
  );
}

export default SearchList;
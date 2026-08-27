import { useChatStore } from '../store/useChatStore'
import SearchList from './SearchList';

function ActiveTabSwitch({ search, setSearch }) {
  const{activeTab,setActiveTab}=useChatStore();
  return (
    <div>

       <div className="p-4 border-b border-slate-700/50">
        {/* <img src="/logo.png" alt="logo" className="w-40 h-auto object-contain" /> */}
        <SearchList search={search} setSearch={setSearch}/>
        </div>

    <div className='tabs tabs-boxed bg-transparent p-2 m-2 '>
      
      <button onClick={() => setActiveTab("chats")}
        className={`tab ${
          activeTab === "chats" ? "bg-[#2d2154d8] text-white" : "text-slate-400"
        }`}>Chats</button>
        
       <button  onClick={() => setActiveTab("contacts")}
        className={`tab ${
          activeTab === "contacts" ? "bg-[#2d2154d8] text-white" : "text-slate-400"
        }`}>Contacts</button>
    </div>
    </div>
  )
}

export default ActiveTabSwitch

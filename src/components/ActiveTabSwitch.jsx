import { useChatStore } from '../store/useChatStore'

function ActiveTabSwitch() {
  const{activeTab,setActiveTab}=useChatStore();
  return (
    <div className='tabs tabs-boxed bg-transparent p-2 m-2'>
      <button onClick={() => setActiveTab("chats")}
        className={`tab ${
          activeTab === "chats" ? "bg-[#2d2154d8] text-white" : "text-slate-400"
        }`}>Chats</button>
        
       <button  onClick={() => setActiveTab("contacts")}
        className={`tab ${
          activeTab === "contacts" ? "bg-[#2d2154d8] text-white" : "text-slate-400"
        }`}>Contacts</button>
    </div>
  )
}

export default ActiveTabSwitch

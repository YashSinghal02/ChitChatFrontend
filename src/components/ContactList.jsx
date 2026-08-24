import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";



function ContactList() {
  const{getAllContacts,isUserLoading,allContacts,setSelctedUser}=useChatStore();

  useEffect(() => {
    getAllContacts()

  }, [getAllContacts]);

  if(isUserLoading){
    return <UsersLoadingSkeleton/>
  }

  if(allContacts.length === 0){
    return <NoChatsFound/>
  }
  


  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelctedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* todo: here we use the socket and fix online status */}
            <div className={`avatar online`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ContactList

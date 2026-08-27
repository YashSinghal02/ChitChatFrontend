import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

import { useAuthStore } from "../store/useAuthStore";
import NoContactFound from "./NoContactFound";

function ContactList({ search }) {
  const { getAllContacts, isUserLoading, allContacts, setSelctedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const filteredContacts = allContacts.filter((contact) =>
  contact.fullName?.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) {
    return <UsersLoadingSkeleton />;
  }

   if (allContacts.length === 0) {
  return <NoContactFound/>;
}


  if (search && filteredContacts.length === 0) {
    return <NoContactFound  />;
  }

  return (
    <>
      {filteredContacts.map((contact) => (
        <div
          key={contact._id}
          className=" p-3 rounded-full cursor-pointer hover:bg-[#2d2154d8] transition-colors hover:rounded-full"
          onClick={() => setSelctedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* here we use the socket to fix online status */}
            <div
              className={`avatar`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
              <span
          className={`absolute top-0 right-0 size-3 z-10 rounded-full border-2 border-[#15121f] ${
            onlineUsers.includes(contact._id)
              ? "bg-green-500"
              : "bg-slate-400"
          }`}
        />
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;

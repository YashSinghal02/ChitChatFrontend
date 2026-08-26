import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, isUserLoading, allContacts, setSelctedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) {
    return <UsersLoadingSkeleton />;
  }

  if (allContacts.length === 0) {
    return <NoChatsFound />;
  }

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className=" p-3 rounded-full cursor-pointer hover:bg-[#2d2154d8] transition-colors hover:rounded-full"
          onClick={() => setSelctedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* here we use the socket to fix online status */}
            <div
              className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
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

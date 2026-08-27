import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, LoaderIcon } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { authUser, logout, updateProfile,isUpdating } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const [slectedImg, setSlectedImg] = useState(null);

  const fileInputRef = useRef(null);
  const handleImageUpload = (e) => {
    // The user selects an image from the file picker.
    const file = e.target.files[0];
    // If the user cancels the file picker, there is no file.
    if (!file) return;

    // FileReader is a browser API that allows JavaScript to read the contents of a file selected by the user
    const reader = new FileReader();
    // Read this image and convert it into a Data URL
    reader.readAsDataURL(file);

    // Wait until reading finishes
    reader.onloadend = async () => {
      // reader.result contains the Data URL/Base64 representation of your image.
      const base64Image = reader.result;
      setSlectedImg(base64Image);
      await updateProfile({profilePic:base64Image})
    };
  };

  return (
    <div className="p-4 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex item-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            
            >
              <img
                src={slectedImg || authUser.profilePic || "/avatar.png"}
                className="size-full object-cover"
                
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">  {isUpdating ? <LoaderIcon className="w-full h-5 animate-spin text-center"/> : "Change" }</span>
              </div>
            </button>

             {/* Custom online indicator */}
  <span className="absolute top-0 right-1 size-[0.85rem] rounded-full bg-green-500 border-2 border-[#111827]" />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* username and online status */}

          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>

            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* logout and Sound Buttons */}

        <div className="flex gap-4 items-center">
          {/* logout btn */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>
          {/* sound btn */}

          {/* I create an Audio object using the mouse-click.mp3 file located inside the public/sounds folder. Whenever the user clicks the sound button, the .play() function plays that sound. The .catch() handles any error if the browser fails to play the audio, so the error doesn't crash the application. After that, toggleSound() toggles the sound state between enabled and disabled. Finally, I use a ternary operator: if isSoundEnabled is true, I display the Volume2Icon; otherwise, I display the VolumeOffIcon. */}

          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // This is useful if the user clicks quickly multiple times.
              // Without it, a new click might wait for the previous sound to finish.
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

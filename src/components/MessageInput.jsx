import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import useKeyBoardSound from "../hooks/useKeyboardSound";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomSound } = useKeyBoardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessages = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 border-t border-slate-700/50">
      {/* imagePreview */}
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {/* form for input field */}
      <form
        onSubmit={handleSendMessages}
        className="max-3xl mx-auto flex space-x-4"
      >
        {/* Input For Text */}
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomSound();
          }}
          className="flex-1 bg-[#111827]/80 border border-slate-700/50 rounded-full py-2 px-4 text-white outline-none focus:border-[#533993] transition-colors duration-300  "
          placeholder="Type your message..."
        />

        {/* Image Upload Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Image Uplaod Btn */}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-[#111827]/80 text-slate-400 hover:text-[#b69bea] rounded-lg px-4 transition-colors ${
            imagePreview ? "text-[#b69bea]" : ""
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Send btn */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-gradient-to-r from-[#47259a] to-[#5a36b5] text-white rounded-lg px-4 py-2 font-medium hover:from-[#5a36b5] hover:to-[#6b46c1] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;

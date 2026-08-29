function BorderAnimatedContainer({ children }) {
  return (
    <div
      className="
        w-full h-full
        rounded-2xl
        border-2 border-transparent
        overflow-hidden
        flex
        [background:linear-gradient(45deg,#1c1735,#2d2154_50%,#1c1735)_padding-box,conic-gradient(from_var(--border-angle),rgb(116_93_192_/_0.3)_80%,#825bf1_86%,#8864ee_90%,#7f5be6_94%,rgb(116_93_192_/_0.3))_border-box]
      "
    >
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;
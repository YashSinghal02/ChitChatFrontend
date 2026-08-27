function UsersLoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-[#171329]/70 p-4 rounded-full animate-pulse"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#3a2d68] rounded-full"></div>

            <div className="flex-1">
              <div className="h-4 bg-[#3a2d68] rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-[#2d2452] rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersLoadingSkeleton;
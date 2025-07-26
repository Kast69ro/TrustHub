export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-[#D7C4A3] rounded-sm"></div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#D7C4A3] rounded-full border-2 border-white"></div>
      </div>
      <span className="font-serif text-xl font-bold text-black">TrustHub</span>
    </div>
  )
}

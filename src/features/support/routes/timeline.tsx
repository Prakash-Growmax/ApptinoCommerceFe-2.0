interface TimelineItemProps {
  title: string
  date: string
  description: string
  isActive?: boolean
  isLast?: boolean
}

function TimelineItem({ title, date, description, isActive = false, isLast = false }: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-6 ">
      {/* Line */}
      {!isLast && (
        <span className="absolute top-2 left-1.5 h-full w-px bg-gray-400" />
      )}

      {/* Dot */}
      <span
        className={`absolute left-0 top-0 w-3 h-3 rounded-full mt-2 ${
          isActive ? "bg-black" : "bg-gray-300"
        }`}
      />

      {/* Content */}
      <div className="-mt-6">
        <div className="flex flex-col  gap-0.5">
          <span className="text-md font-medium text-gray-900 capitalize">{title}</span>
          <span className="text-xs text-gray-500 capitalize mt-[6px] ml-1">{date}</span>
        </div>
        <p className="text-sm text-gray-800 capitalize">{description}</p>
      </div>
    </div>
  )
}

export default TimelineItem;

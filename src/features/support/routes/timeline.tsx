interface TimelineItemProps {
  title: string
  date: string
  description: string
  isActive?: boolean
  isLast?: boolean
}

function TimelineItem({ title, date, description, isActive = false, isLast = false }: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-6">
      {/* Line */}
      {!isLast && (
        <span className="absolute top-0 left-1.5 h-full w-px bg-gray-300" />
      )}

      {/* Dot */}
      <span
        className={`absolute left-0 top-0 w-3 h-3 rounded-full ${
          isActive ? "bg-black" : "bg-gray-300"
        }`}
      />

      {/* Content */}
      <div className="-mt-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-gray-900">{title}</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  )
}

export default TimelineItem;

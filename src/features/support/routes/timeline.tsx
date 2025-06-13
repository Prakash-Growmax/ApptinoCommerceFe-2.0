interface TimelineItemProps {
  title: string
  date: string
  description: string
  isActive?: boolean
}

function TimelineItem({ title, date, description, isActive }: TimelineItemProps) {
  return (
    <div className="flex items-start gap-4 relative pl-4">
      {/* Dot */}
      <div
        className={`w-3 h-3 rounded-full mt-1 ${
          isActive ? "bg-black" : "bg-muted"
        } absolute left-0`}
      />
      {/* Content */}
      <div className="space-y-0.5">
        <div className="flex">
            
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{date}</div>
        </div>
        <div className="text-sm text-gray-900">{description}</div>
      </div>
    </div>
  )
}

export default TimelineItem
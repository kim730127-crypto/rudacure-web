'use client'

import { useState, useEffect } from 'react'

interface DynamicTitleProps {
  title1: string
  title2: string
  titleByType: Record<string, [string, string]>
}

export default function DynamicTitle({ title1, title2, titleByType }: DynamicTitleProps) {
  const [displayTitle, setDisplayTitle] = useState<[string, string]>([title1, title2])

  // Listen for custom events from the form
  useEffect(() => {
    const handleTypeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ type: string }>
      const selectedType = customEvent.detail.type
      const newTitle = titleByType[selectedType] || titleByType.default || [title1, title2]
      setDisplayTitle(newTitle)
    }

    window.addEventListener('inquiryTypeChanged', handleTypeChange)
    return () => window.removeEventListener('inquiryTypeChanged', handleTypeChange)
  }, [titleByType, title1, title2])

  return (
    <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900 dark:text-slate-100">
      <em className="font-playfair italic font-semibold">{displayTitle[0]}</em> {displayTitle[1]}
    </h1>
  )
}

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
    <h1 className="type-h1 text-ink-900 mb-6">
      <em>{displayTitle[0]}</em> {displayTitle[1]}
    </h1>
  )
}

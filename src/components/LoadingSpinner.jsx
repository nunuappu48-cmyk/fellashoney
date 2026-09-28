import React from 'react'

export const LoadingSpinner = ({ size = 'md', text = 'Loading pure honey...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-honey-200 border-t-honey-500 rounded-full animate-spin`} />
        <span className="absolute inset-0 flex items-center justify-center text-xs">🍯</span>
      </div>
      {text && <p className="text-sm font-medium text-amberBrown-600 animate-pulse">{text}</p>}
    </div>
  )
}

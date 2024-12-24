"use client"

import * as React from "react"

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, label, ...props }, ref) => {
    return (
      <div className="flex items-center justify-between space-x-2 text-sm md:text-base">
        {label && <span className="flex-1">{label}</span>}
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          ref={ref}
          onClick={() => onCheckedChange?.(!checked)}
          className={`relative inline-flex h-5 md:h-6 w-9 md:w-11 items-center rounded-full transition-colors flex-shrink-0 ${
            checked ? 'bg-[#fe9800]' : 'bg-[#ffcb82]'
          }`}
          {...props}
        >
          <span
            className={`inline-block h-3 md:h-4 w-3 md:w-4 transform rounded-full bg-white transition-transform ${
              checked ? 'translate-x-5 md:translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    )
  }
)

Switch.displayName = "Switch"

export { Switch } 
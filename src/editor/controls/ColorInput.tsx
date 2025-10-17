import React from 'react'

export function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block text-sm mb-3">
      <span className="block text-neutral-600 mb-1">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          className="h-9 w-12 rounded border border-neutral-300"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-neutral-300 px-3 py-2"
        />
      </div>
    </label>
  )
}

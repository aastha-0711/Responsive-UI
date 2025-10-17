import React from 'react'

type Option = { label: string; value: string }

export function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: Option[]
  onChange: (v: string) => void
}) {
  return (
    <label className="block text-sm mb-3">
      <span className="block text-neutral-600 mb-1">{label}</span>
      <select
        className="w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}

export function RadioGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { label: string; value: string }[]
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-3">
      <div className="text-sm text-neutral-600 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value
          return (
            <button
              key={o.value}
              onClick={() => onChange(o.value)}
              type="button"
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-150 ${
                active
                  ? 'custom-radio-label bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                  : 'bg-transparent text-black border-neutral-300 hover:bg-neutral-200 dark:text-white dark:border-white dark:hover:bg-neutral-700'
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

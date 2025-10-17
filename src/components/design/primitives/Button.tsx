import clsx from 'classnames'

export function Button({
  label,
  align = 'left',
  bg,
  text,
  radius,
  shadow,
}: {
  label: string
  align?: 'left' | 'center' | 'right'
  bg: string
  text: string
  radius: number
  shadow: 'none' | 'sm' | 'md' | 'lg'
}) {
  const justify = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[align]

  const shadowClass = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  }[shadow]

  return (
    <div className={clsx('flex', justify)}>
     <button
  style={{ backgroundColor: bg, color: text, borderRadius: radius }}
  className={clsx('px-4 py-2 font-medium transition hover:opacity-90', shadowClass)}
>
  {label}
</button>

    </div>
  )
}

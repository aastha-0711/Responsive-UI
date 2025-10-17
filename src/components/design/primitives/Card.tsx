export function Card({ children, radius }: { children: React.ReactNode, radius: number }) {
  return (
    <div
      className="border bg-white dark:bg-neutral-900 transition-colors"
      style={{
        borderColor: 'var(--ui-stroke-color)',
        borderWidth: 'var(--ui-stroke-width)',
        borderRadius: radius,
      }}
    >
      {children}
    </div>
  )
}

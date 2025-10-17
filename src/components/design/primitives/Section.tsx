export function Section({ children, padding }: { children: React.ReactNode; padding: number }) {
  return (
    <section
      className="w-full transition-colors"
      style={{
        background: 'var(--ui-section-bg)',
        padding,
      }}
    >
      {children}
    </section>
  )
}

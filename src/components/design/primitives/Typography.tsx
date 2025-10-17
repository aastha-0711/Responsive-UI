export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2" style={{
      fontFamily: 'var(--ui-font-family)',
      fontWeight: 'var(--ui-font-weight)' as any,
      fontSize: 'calc(var(--ui-font-size) * 1.25)'
    }}>{children}</h2>
  )
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-neutral-600" style={{
      fontFamily: 'var(--ui-font-family)',
      fontWeight: 'var(--ui-font-weight)' as any,
      fontSize: 'var(--ui-font-size)'
    }}>{children}</p>
  )
}

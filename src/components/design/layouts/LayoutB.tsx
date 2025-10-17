import { Card } from '../primitives/Card'
import { Section } from '../primitives/Section'
import { Heading, Paragraph } from '../primitives/Typography'
import { Button } from '../primitives/Button'
import { Gallery } from '../primitives/Gallery'

export function LayoutB({
  cardRadius,
  padding,
  button,
  gallery,
  texts,
}: {
  cardRadius: number
  padding: number
  button: { align: 'left'|'center'|'right'; bg: string; text: string; radius: number; shadow: 'none'|'sm'|'md'|'lg' }
  gallery: { align: 'left'|'center'|'right'; spacing: number; radius: number; images?: string[] }
  texts: { heading: string; paragraph: string; buttonLabel: string }
}) {
  return (
    <Section padding={padding}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <Card radius={cardRadius}>
          <div className="p-6 space-y-2 h-full">
            <Heading>{texts.heading}</Heading>
            <Paragraph>{texts.paragraph}</Paragraph>
            <div className="mt-4" title="Sample CTA button">
              <Button label={texts.buttonLabel} align={button.align} bg={button.bg} text={button.text} radius={button.radius} shadow={button.shadow} />
            </div>
          </div>
        </Card>
        <Card radius={cardRadius}>
          <div className="p-6 space-y-4">
            <Gallery align={gallery.align} spacing={gallery.spacing} radius={gallery.radius} images={gallery.images} />
          </div>
        </Card>
      </div>
    </Section>
  )
}

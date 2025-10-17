import { z } from 'zod'

export const uiConfigSchema = z.object({
  typography: z.object({
    family: z.enum([
    'Inter',
    'Poppins',
    'Roboto',
    'Montserrat',
    'Lato',
    'Open Sans',
    'Nunito',
    '',
  ]),
    weight: z.enum(['400','500','600','700']),
    sizePx: z.number().min(10).max(60),
  }),
  button: z.object({
    radius: z.number().min(0).max(32),
    shadow: z.enum(['none','sm','md','lg']),
    align: z.enum(['left','center','right']),
    bg: z.string(),
    text: z.string()
  }),
  gallery: z.object({
    align: z.enum(['left','center','right']),
    spacing: z.number().min(0).max(64),
    radius: z.number().min(0).max(32),
    // images may be URLs or base64 strings; keep schema permissive
    images: z.array(z.string()).optional(),
  }),
  layout: z.object({
    cardRadius: z.number().min(0).max(32),
    containerPadding: z.number().min(0).max(64),
    sectionBg: z.string(),
    strokeColor: z.string(),
    strokeWidth: z.number().min(0).max(8),
  }),
  texts: z.object({
    heading: z.string(),
    paragraph: z.string(),
    buttonLabel: z.string(),
  }),
  variant: z.enum(['layoutA','layoutB']),
})

export type UIConfig = z.infer<typeof uiConfigSchema>

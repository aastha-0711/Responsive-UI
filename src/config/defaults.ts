import { UIConfig } from './schema'

export const defaultConfig: UIConfig = {
  typography: {
    family: 'Inter',
    weight: '600',
    sizePx: 16,
  },
  button: {
    radius: 12,
    shadow: 'md',
    align: 'left',
    bg: '#111827',
    text: '#ffffff',
  },
  gallery: {
    align: 'left',
    spacing: 12,
    radius: 10,
    images: [],
  },
  layout: {
    cardRadius: 16,
    containerPadding: 24,
    sectionBg: '#ffffff',
    strokeColor: '#e5e7eb',
    strokeWidth: 1,
  },
  texts: {
    heading: 'Summer Collection',
    paragraph: 'Explore the latest arrivals in our curated selection. Adjustable styles and vibrant palettes.',
    buttonLabel: 'Shop Now',
  },
  variant: 'layoutA',
}

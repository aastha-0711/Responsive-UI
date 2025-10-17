# Dynamic UI Editor

A React + TypeScript + Tailwind app that lets you live‑edit a component library (typography, buttons, gallery, layout) with real-time preview, layout A/B switching, and JSON import/export.

## Quick start

```bash
npm i
npm run dev
```

Open https://dynamic-ui-phi.vercel.app/

## Tech
- React + TS + Vite
- TailwindCSS
- Zustand (state)
- Zod (schema/validation)

## Structure
```
src/
  components/design/
    DesignPreview.tsx
    layouts/
      LayoutA.tsx
      LayoutB.tsx
    primitives/
      Button.tsx
      Card.tsx
      Gallery.tsx
      Section.tsx
      Typography.tsx
  editor/
    EditorPanel.tsx
    controls/
      Select.tsx
      Slider.tsx
      ColorInput.tsx
      RadioGroup.tsx
  config/
    schema.ts
    defaults.ts
  store/
    useConfigStore.ts
  pages/
    Demo.tsx
  App.tsx
  main.tsx
  index.css
```

## Features
- Live updates across the preview
- Layout A/B variant toggle
- Button alignment, radius, shadow, colors
- Typography family/size/weight
- Gallery alignment/spacing/radius
- Layout card radius, padding, stroke, bg
- Import/Export JSON with validation

## Deploy
```
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host (Vercel/Netlify/etc.).

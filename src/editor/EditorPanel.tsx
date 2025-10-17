import { useMemo, useRef, useState } from 'react'
import { useConfigStore } from '../store/useConfigStore'
import { uiConfigSchema } from '../config/schema'
import { Select } from './controls/Select'
import { Slider } from './controls/Slider'
import { ColorInput } from './controls/ColorInput'
import { RadioGroup } from './controls/RadioGroup'

const PALETTES = [
  {
    name: 'Minimal Light',
    layout: { sectionBg: '#ffffff', strokeColor: '#e5e7eb' },
    button: { bg: '#111827', text: '#ffffff' },
  },
  {
    name: 'Soft Rose',
    layout: { sectionBg: '#fff1f2', strokeColor: '#fecdd3' },
    button: { bg: '#db2777', text: '#fff' },
  },
  {
    name: 'Ocean',
    layout: { sectionBg: '#ecfeff', strokeColor: '#a5f3fc' },
    button: { bg: '#0369a1', text: '#e0f2fe' },
  },
  {
    name: 'Forest',
    layout: { sectionBg: '#ecfdf5', strokeColor: '#a7f3d0' },
    button: { bg: '#065f46', text: '#d1fae5' },
  },
]

export function EditorPanel() {
  const { config, set, replace, reset, undo, redo, savePreset, loadPreset, deletePreset, presets } = useConfigStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [presetName, setPresetName] = useState('')

  // --- helpers ---
  const setTypography = (partial: Partial<typeof config.typography>) =>
    set({ typography: { ...config.typography, ...partial } })
  const setButton = (partial: Partial<typeof config.button>) =>
    set({ button: { ...config.button, ...partial } })
  const setGallery = (partial: Partial<typeof config.gallery>) =>
    set({ gallery: { ...config.gallery, ...partial } })
  const setLayout = (partial: Partial<typeof config.layout>) =>
    set({ layout: { ...config.layout, ...partial } })
  const setTexts = (partial: Partial<typeof config.texts>) =>
    set({ texts: { ...config.texts, ...partial } })

  // --- export/import ---
  const exportJSON = () => {
    const cleanConfig = {
      ...config,
      gallery: {
        ...config.gallery,
        images: config.gallery.images?.map((i) =>
          i.startsWith('data:image') ? '[embedded-image]' : i
        ),
      },
    }
    try {
      const blob = new Blob([JSON.stringify(cleanConfig, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'ui-config.json'
      a.click()
      URL.revokeObjectURL(url)
      alert('✅ Config exported successfully!')
    } catch {
      alert('⚠️ Export failed – please try again.')
    }
  }

  const importJSON = async (file: File) => {
    const text = await file.text()
    try {
      const json = JSON.parse(text)
      const parsed = uiConfigSchema.safeParse(json)
      if (!parsed.success) {
        alert('Invalid config JSON.')
        return
      }
      const newConfig = {
        ...parsed.data,
        gallery: {
          ...parsed.data.gallery,
          images: parsed.data.gallery.images?.map((img) =>
            img === '[embedded-image]' ? '' : img
          ),
        },
      }
      replace(newConfig)
      alert('✅ Config imported successfully!')
    } catch (e) {
      alert('⚠️ Could not parse JSON file.')
    }
  }

  // --- Generate component file ---
  const generateComponent = () => {
    const code = `import React from 'react'

export default function GeneratedCard() {
  return (
    <div style={{
      fontFamily: '${config.typography.family}',
      fontWeight: ${config.typography.weight},
      fontSize: '${config.typography.sizePx}px',
      background: '${config.layout.sectionBg}',
      padding: '${config.layout.containerPadding}px',
      border: '${config.layout.strokeWidth}px solid ${config.layout.strokeColor}',
      borderRadius: '${config.layout.cardRadius}px'
    }}>
      <h2 style={{ margin: 0, marginBottom: 8 }}>${config.texts.heading}</h2>
      <p style={{ marginTop: 0, color: '#6b7280' }}>${config.texts.paragraph}</p>
      <div style={{ display: 'flex', justifyContent: '${config.button.align}' }}>
        <button style={{
          background: '${config.button.bg}',
          color: '${config.button.text}',
          borderRadius: '${config.button.radius}px',
          padding: '8px 16px',
          border: 'none',
          cursor: 'pointer'
        }}>${config.texts.buttonLabel}</button>
      </div>
    </div>
  )
}
`
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'GeneratedCard.tsx'
    a.click()
    URL.revokeObjectURL(url)
  }

  const presetNames = useMemo(() => Object.keys(presets).sort(), [presets])

  // --- UI ---
  return (
    <div className="p-4 space-y-6">
      {/* Top actions */}
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-1.5 rounded-lg border" onClick={undo} title="Undo last change">
          Undo
        </button>
        <button className="px-3 py-1.5 rounded-lg border" onClick={redo} title="Redo change">
          Redo
        </button>
        <button className="px-3 py-1.5 rounded-lg border" onClick={reset} title="Reset to defaults">
          Reset
        </button>
        <button className="px-3 py-1.5 rounded-lg border" onClick={exportJSON} title="Export config JSON">
          Export
        </button>
        <input
          ref={fileRef}
          className="hidden"
          type="file"
          accept="application/json"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) importJSON(f)
          }}
        />
        <button
          className="px-3 py-1.5 rounded-lg border"
          title="Import config JSON"
          onClick={() => fileRef.current?.click()}
        >
          Import
        </button>
        <button
          className="px-3 py-1.5 rounded-lg border"
          title="Download a React component file"
          onClick={generateComponent}
        >
          Generate .tsx
        </button>
      </div>

      {/* Presets */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-700 mb-2">Presets</h2>
        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 rounded-lg border px-3 py-1.5 text-sm"
            placeholder="Preset name"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
          />
          <button
            className="px-3 py-1.5 rounded-lg border"
            onClick={() => {
              savePreset(presetName)
              setPresetName('')
            }}
          >
            Save
          </button>
        </div>
        {presetNames.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {presetNames.map((name) => (
              <button
                key={name}
                className={`px-2 py-1 text-xs border rounded transition-all duration-150 ${
                  JSON.stringify(presets[name]) === JSON.stringify(config)
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white'
                    : 'border-neutral-300 text-neutral-800 dark:border-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
                onClick={() => loadPreset(name)}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </section>

     {/* Palettes */}
<section>
  <h2 className="text-sm font-semibold text-neutral-700 mb-2">Color Palettes</h2>
  <div className="flex flex-wrap gap-2">
    {PALETTES.map((p) => {
      const isActive =
        config.layout.sectionBg === p.layout.sectionBg &&
        config.layout.strokeColor === p.layout.strokeColor;

      return (
        <button
          key={p.name}
          title={p.name}
          onClick={() => {
            setLayout({
              sectionBg: p.layout.sectionBg,
              strokeColor: p.layout.strokeColor,
            });
            setButton({ bg: p.button.bg, text: p.button.text });
          }}
          className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-150 ${
            isActive
              ? 'palette-label bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
              : 'bg-transparent text-black border-neutral-300 hover:bg-neutral-200 dark:text-white dark:border-white dark:hover:bg-neutral-700'
          }`}
        >
          {p.name}
        </button>
      );
    })}
  </div>
</section>


      {/* Variant */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-700 mb-2">Variant</h2>
        <RadioGroup
          label="Layout Variant"
          value={config.variant}
          onChange={(v) => set({ variant: v as any })}
          options={[
            { label: 'Layout A', value: 'layoutA' },
            { label: 'Layout B', value: 'layoutB' },
          ]}
        />
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-700 mb-2">Typography</h2>
        <Select
          label="Font family"
          value={config.typography.family}
          onChange={(v) => setTypography({ family: v as any })}
          options={[
            { label: 'Inter', value: 'Inter' },
            { label: 'Poppins', value: 'Poppins' },
            { label: 'Roboto', value: 'Roboto' },
            { label: 'Montserrat', value: 'Montserrat' },
            { label: 'Lato', value: 'Lato' },
            { label: 'Open Sans', value: 'Open Sans' },
            { label: 'Nunito', value: 'Nunito' },
          ]}
        />
        <Select
          label="Font weight"
          value={config.typography.weight}
          onChange={(v) => setTypography({ weight: v as any })}
          options={[
            { label: '400', value: '400' },
            { label: '500', value: '500' },
            { label: '600', value: '600' },
            { label: '700', value: '700' },
          ]}
        />
        <Slider
          label="Font size"
          value={config.typography.sizePx}
          min={10}
          max={60}
          onChange={(v) => setTypography({ sizePx: v })}
          suffix="px"
        />
      </section>

      {/* Texts */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-700 mb-2">Texts</h2>
        <label className="block text-sm mb-3">
          <span className="block text-neutral-600 mb-1">Heading</span>
          <input
            className="w-full rounded-lg border px-3 py-2"
            value={config.texts.heading}
            onChange={(e) => setTexts({ heading: e.target.value })}
          />
        </label>
        <label className="block text-sm mb-3">
          <span className="block text-neutral-600 mb-1">Paragraph</span>
          <textarea
            className="w-full rounded-lg border px-3 py-2 text-sm"
            rows={3}
            value={config.texts.paragraph}
            onChange={(e) => setTexts({ paragraph: e.target.value })}
          />
        </label>
        <label className="block text-sm mb-3">
          <span className="block text-neutral-600 mb-1">Button label</span>
          <input
            className="w-full rounded-lg border px-3 py-2"
            value={config.texts.buttonLabel}
            onChange={(e) => setTexts({ buttonLabel: e.target.value })}
          />
        </label>
      </section>

      {/* Button */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-700 mb-2">Button</h2>
        <Slider
          label="Radius"
          value={config.button.radius}
          min={0}
          max={32}
          onChange={(v) => setButton({ radius: v })}
          suffix="px"
        />
        <RadioGroup
          label="Shadow"
          value={config.button.shadow}
          onChange={(v) => setButton({ shadow: v as any })}
          options={[
            { label: 'None', value: 'none' },
            { label: 'Sm', value: 'sm' },
            { label: 'Md', value: 'md' },
            { label: 'Lg', value: 'lg' },
          ]}
        />
        <RadioGroup
          label="Alignment"
          value={config.button.align}
          onChange={(v) => setButton({ align: v as any })}
          options={[
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ]}
        />
        <ColorInput label="Background" value={config.button.bg} onChange={(v) => setButton({ bg: v })} />
        <ColorInput label="Text color" value={config.button.text} onChange={(v) => setButton({ text: v })} />
      </section>

      {/* Gallery */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-700 mb-2">Gallery</h2>
        <RadioGroup
          label="Alignment"
          value={config.gallery.align}
          onChange={(v) => setGallery({ align: v as any })}
          options={[
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ]}
        />
        <Slider
          label="Spacing"
          value={config.gallery.spacing}
          min={0}
          max={64}
          onChange={(v) => setGallery({ spacing: v })}
          suffix="px"
        />
        <Slider
          label="Image radius"
          value={config.gallery.radius}
          min={0}
          max={32}
          onChange={(v) => setGallery({ radius: v })}
          suffix="px"
        />
        <label className="block text-sm mb-3">
          <span className="block text-neutral-600 mb-1">Image URLs (comma-separated)</span>
          <textarea
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            rows={2}
            value={config.gallery.images?.join(', ') || ''}
            onChange={(e) => {
              const urls = e.target.value
                .split(',')
                .map((x) => x.trim())
                .filter(Boolean)
              setGallery({ images: urls })
            }}
          />
        </label>
      </section>

      {/* Layout */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-700 mb-2">Layout</h2>
        <Slider
          label="Card radius"
          value={config.layout.cardRadius}
          min={0}
          max={32}
          onChange={(v) => setLayout({ cardRadius: v })}
          suffix="px"
        />
        <Slider
          label="Container padding"
          value={config.layout.containerPadding}
          min={0}
          max={64}
          onChange={(v) => setLayout({ containerPadding: v })}
          suffix="px"
        />
        <ColorInput
          label="Section background"
          value={config.layout.sectionBg}
          onChange={(v) => setLayout({ sectionBg: v })}
        />
        <ColorInput
          label="Stroke color"
          value={config.layout.strokeColor}
          onChange={(v) => setLayout({ strokeColor: v })}
        />
        <Slider
          label="Stroke width"
          value={config.layout.strokeWidth}
          min={0}
          max={8}
          onChange={(v) => setLayout({ strokeWidth: v })}
          suffix="px"
        />
      </section>
    </div>
  )
}

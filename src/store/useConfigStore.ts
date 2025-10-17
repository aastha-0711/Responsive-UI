import { create } from 'zustand'
import { UIConfig } from '../config/schema'
import { defaultConfig } from '../config/defaults'

const LS_KEY_CONFIG = 'ui-config:v1'
const LS_KEY_PRESETS = 'ui-presets:v1'
const LS_KEY_THEME = 'ui-theme:v1'

// helpers
const loadLS = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}
const saveLS = (key: string, value: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

type PresetsMap = Record<string, UIConfig>

type State = {
  config: UIConfig
  theme: 'light' | 'dark'
  device: 'mobile' | 'tablet' | 'desktop' | 'full'

  // history for undo/redo
  past: UIConfig[]
  future: UIConfig[]

  presets: PresetsMap

  set: (partial: Partial<UIConfig>) => void
  replace: (cfg: UIConfig, pushHistory?: boolean) => void
  reset: () => void

  undo: () => void
  redo: () => void

  setTheme: (t: 'light'|'dark') => void
  setDevice: (d: State['device']) => void

  savePreset: (name: string) => void
  loadPreset: (name: string) => void
  deletePreset: (name: string) => void
}

const initialConfig = typeof window !== 'undefined'
  ? loadLS<UIConfig>(LS_KEY_CONFIG, defaultConfig)
  : defaultConfig

const initialPresets = typeof window !== 'undefined'
  ? loadLS<PresetsMap>(LS_KEY_PRESETS, {})
  : {}

const initialTheme = typeof window !== 'undefined'
  ? loadLS<'light'|'dark'>(LS_KEY_THEME, 'light')
  : 'light'

export const useConfigStore = create<State>((set, get) => ({
  config: initialConfig,
  theme: initialTheme,
  device: 'full',

  past: [],
  future: [],

  presets: initialPresets,

  set: (partial) => {
    const { config, past } = get()
    const next = { ...config, ...partial }
    set({ config: next, past: [...past, config], future: [] })
    saveLS(LS_KEY_CONFIG, next)
  },

  replace: (cfg, pushHistory = true) => {
    const { config, past } = get()
    set({
      config: cfg,
      past: pushHistory ? [...past, config] : past,
      future: []
    })
    saveLS(LS_KEY_CONFIG, cfg)
  },

  reset: () => {
    const { config, past } = get()
    set({ config: defaultConfig, past: [...past, config], future: [] })
    saveLS(LS_KEY_CONFIG, defaultConfig)
  },

  undo: () => {
    const { past, config, future } = get()
    if (past.length === 0) return
    const prev = past[past.length - 1]
    set({ config: prev, past: past.slice(0, -1), future: [config, ...future] })
    saveLS(LS_KEY_CONFIG, prev)
  },

  redo: () => {
    const { past, config, future } = get()
    if (future.length === 0) return
    const next = future[0]
    set({ config: next, past: [...past, config], future: future.slice(1) })
    saveLS(LS_KEY_CONFIG, next)
  },

  setTheme: (t) => {
    set({ theme: t })
    saveLS(LS_KEY_THEME, t)
  },

  setDevice: (d) => set({ device: d }),

  savePreset: (name: string) => {
    if (!name.trim()) return
    const { config, presets } = get()
    const next = { ...presets, [name]: config }
    set({ presets: next })
    saveLS(LS_KEY_PRESETS, next)
  },

  loadPreset: (name: string) => {
    const { presets } = get()
    const cfg = presets[name]
    if (!cfg) return
    get().replace(cfg)
  },

  deletePreset: (name: string) => {
    const { presets } = get()
    const next = { ...presets }
    delete next[name]
    set({ presets: next })
    saveLS(LS_KEY_PRESETS, next)
  },
}))

import { EditorPanel } from '../editor/EditorPanel'
import { DesignPreview } from '../components/design/DesignPreview'
import { useConfigStore } from '../store/useConfigStore'
import { useEffect, useMemo, useState } from 'react'

export default function Demo() {
  const config = useConfigStore(s => s.config)
  const theme = useConfigStore(s => s.theme)
  const setTheme = useConfigStore(s => s.setTheme)
  const device = useConfigStore(s => s.device)
  const setDevice = useConfigStore(s => s.setDevice)

  const [showJSON, setShowJSON] = useState(false)

  // apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  const deviceWidth = useMemo(() => {
    switch (device) {
      case 'mobile': return 390
      case 'tablet': return 768
      case 'desktop': return 1024
      default: return '100%'
    }
  }, [device])
useEffect(() => {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}, [theme])

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)]">
<aside className="border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-y-auto">
        <div className="px-4 py-3 border-b dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold dark:text-white">Dynamic UI Editor</h1>
              <p className="text-xs text-neutral-500">Tweak options & see live preview</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                title="Toggle theme"
                className="px-2 py-1 text-xs border rounded dark:border-neutral-700"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? 'Dark' : 'Light'}
              </button>
              <button
                title="Show/Hide JSON"
                className="px-2 py-1 text-xs border rounded dark:border-neutral-700"
                onClick={() => setShowJSON(v => !v)}
              >
                {showJSON ? 'Hide JSON' : 'Show JSON'}
              </button>
            </div>
          </div>
        </div>

        <EditorPanel />

        {showJSON && (
          <div className="p-4 border-t dark:border-neutral-800">
            <h3 className="text-sm font-semibold mb-2 dark:text-white">Live Config JSON</h3>
            <textarea
              readOnly
              className="w-full h-48 text-xs rounded border dark:border-neutral-700 bg-white dark:bg-neutral-950 dark:text-neutral-200 p-2"
              value={JSON.stringify(config, null, 2)}
            />
          </div>
        )}
      </aside>

      <main className="overflow-auto bg-neutral-50 dark:bg-neutral-950">
        <div className="p-6 min-h-full flex justify-center">
          <div
            className="shadow-md bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
            style={{ width: deviceWidth as number | string }}
          >
            {/* device toolbar */}
            <div className="flex items-center gap-2 p-2 border-b dark:border-neutral-800 text-xs">
              <span className="text-neutral-500">Preview:</span>
              {(['mobile','tablet','desktop','full'] as const).map(d => (
                <button
                  key={d}
                  className={`px-2 py-1 border rounded ${device === d ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'dark:border-neutral-700'}`}
                  onClick={() => setDevice(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="p-0">
<DesignPreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

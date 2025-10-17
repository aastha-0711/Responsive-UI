import { useRef, useEffect } from "react"
import { useConfigStore } from "../../store/useConfigStore"

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function DesignPreview() {
  const { config, set } = useConfigStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { typography, button, gallery, layout, texts, variant } = config

  // expose design tokens to primitives (Card/Section)
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--ui-section-bg", layout.sectionBg)
    root.style.setProperty("--ui-stroke-color", layout.strokeColor)
    root.style.setProperty("--ui-stroke-width", `${layout.strokeWidth}px`)
  }, [layout])

  // Upload: store Data URLs so they survive reloads/theme toggles
  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return
    const added = await Promise.all(Array.from(files).map(fileToDataURL))
    set({
      gallery: { ...gallery, images: [...(gallery.images || []), ...added] },
    })
  }

  // safe justify classes (no template strings for Tailwind)
  const galleryJustify =
    gallery.align === "center"
      ? "justify-center"
      : gallery.align === "right"
      ? "justify-end"
      : "justify-start"

  const galleryJustifyMd =
    gallery.align === "center"
      ? "md:justify-center"
      : gallery.align === "right"
      ? "md:justify-end"
      : "md:justify-start"

  const buttonJustify =
    button.align === "center"
      ? "justify-center"
      : button.align === "right"
      ? "justify-end"
      : "justify-start"

  const buttonJustifyMd =
    button.align === "center"
      ? "md:justify-center"
      : button.align === "right"
      ? "md:justify-end"
      : "md:justify-start"

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen transition-all duration-300"
      style={{
        backgroundColor: layout.sectionBg,
        padding: `${layout.containerPadding}px`, // ← slider affects this
      }}
    >
      <div
        className="shadow-md border overflow-hidden transition-all duration-300 max-w-4xl w-full bg-white dark:bg-neutral-800"
        style={{
          borderRadius: `${layout.cardRadius}px`,
          borderColor: layout.strokeColor,
          borderWidth: `${layout.strokeWidth}px`,
        }}
      >
        {variant === "layoutA" ? (
          <>
            {/* Text */}
            <div className="p-6 text-center">
              <h1
                className="leading-tight mb-2 break-words text-neutral-900 dark:text-neutral-100"
                style={{
                  fontFamily: typography.family,
                  fontWeight: typography.weight as any,
                  fontSize: `${typography.sizePx}px`,
                }}
              >
                {texts.heading}
              </h1>
              <p
                className="leading-relaxed break-words text-neutral-700 dark:text-neutral-300"
                style={{
                  fontFamily: typography.family,
                  fontSize: `${Math.max(typography.sizePx - 2, 12)}px`,
                }}
              >
                {texts.paragraph}
              </p>
            </div>

            {/* Gallery */}
            <div
              className={`flex flex-wrap px-6 pb-4 transition-all ${galleryJustify}`}
              style={{ gap: `${gallery.spacing}px` }}
            >
              {(gallery.images || []).length ? (
                (gallery.images as string[]).map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Gallery ${i}`}
                    className="object-cover transition-transform duration-300 hover:scale-105 shadow-sm dark:shadow-none"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: `${gallery.radius}px`,
                    }}
                  />
                ))
              ) : (
                <p className="text-neutral-400 text-sm italic">No images added yet.</p>
              )}
            </div>

            {/* CTA */}
            <div className={`flex px-6 pb-6 transition-all ${buttonJustify}`}>
              <button
                className="font-medium transition-transform hover:scale-105"
                style={{
                  backgroundColor: button.bg,
                  color: button.text,
                  borderRadius: `${button.radius}px`,
                  boxShadow:
                    button.shadow === "none"
                      ? "none"
                      : button.shadow === "sm"
                      ? "0 1px 2px rgba(0,0,0,0.15)"
                      : button.shadow === "md"
                      ? "0 4px 6px rgba(0,0,0,0.2)"
                      : "0 10px 15px rgba(0,0,0,0.25)",
                  padding: "10px 24px",
                }}
              >
                {texts.buttonLabel}
              </button>
            </div>
          </>
        ) : (
          // ===== Layout B: side-by-side
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between">
            {/* Text */}
            <div className="p-6 md:w-1/2 flex flex-col justify-center text-center md:text-left">
              <h1
                className="leading-tight mb-3 break-words text-neutral-900 dark:text-neutral-100"
                style={{
                  fontFamily: typography.family,
                  fontWeight: typography.weight as any,
                  fontSize: `${typography.sizePx}px`,
                }}
              >
                {texts.heading}
              </h1>
              <p
                className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 break-words"
                style={{
                  fontFamily: typography.family,
                  fontSize: `${Math.max(typography.sizePx - 2, 12)}px`,
                }}
              >
                {texts.paragraph}
              </p>

              <div className={`flex transition-all ${buttonJustify} ${buttonJustifyMd}`}>
                <button
                  className="font-medium transition-transform hover:scale-105"
                  style={{
                    backgroundColor: button.bg,
                    color: button.text,
                    borderRadius: `${button.radius}px`,
                    boxShadow:
                      button.shadow === "none"
                        ? "none"
                        : button.shadow === "sm"
                        ? "0 1px 2px rgba(0,0,0,0.15)"
                        : button.shadow === "md"
                        ? "0 4px 6px rgba(0,0,0,0.2)"
                        : "0 10px 15px rgba(0,0,0,0.25)",
                    padding: "10px 24px",
                  }}
                >
                  {texts.buttonLabel}
                </button>
              </div>
            </div>

            {/* Gallery */}
            <div
              className={`md:w-1/2 flex flex-wrap justify-center ${galleryJustifyMd} gap-4 p-6 transition-all`}
              style={{ gap: `${gallery.spacing}px` }}
            >
              {(gallery.images || []).length ? (
                (gallery.images as string[]).map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Gallery ${i}`}
                    className="object-cover transition-transform duration-300 hover:scale-105 shadow-sm dark:shadow-none"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: `${gallery.radius}px`,
                    }}
                  />
                ))
              ) : (
                <p className="text-neutral-400 text-sm italic">No images added yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Upload link */}
        <div className="px-6 pb-4 flex justify-center">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
          <span
            onClick={() => fileInputRef.current?.click()}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            + Choose Images
          </span>
        </div>
      </div>
    </div>
  )
}

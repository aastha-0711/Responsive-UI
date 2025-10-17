import clsx from 'classnames'
import { useState } from 'react'

export function Gallery({
  align,
  spacing,
  radius,
  images,
}: {
  align: 'left' | 'center' | 'right'
  spacing: number
  radius: number
  images?: string[]
}) {
  const [localImages, setLocalImages] = useState<string[]>(images || [])

  const justify = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[align]

  const galleryImages =
    (localImages && localImages.length > 0)
      ? localImages
      : [1, 2, 3, 4].map(i => `https://picsum.photos/seed/${i}/360/240`)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newImgs: string[] = []
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => {
        if (ev.target?.result) {
          newImgs.push(ev.target.result as string)
          // When all files are read, update state
          if (newImgs.length === files.length) {
            setLocalImages([...localImages, ...newImgs])
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className={clsx('flex flex-col gap-3')}>
      <div className={clsx('flex flex-wrap', justify)} style={{ gap: spacing }}>
        {galleryImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-44 h-28 object-cover border border-neutral-300"
            style={{ borderRadius: radius }}
          />
        ))}
      </div>

      <div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="text-sm"
        />
      </div>
    </div>
  )
}

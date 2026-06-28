'use client'

import { useState, type KeyboardEvent } from 'react'

interface Props {
  value: string[]
  onChange: (notes: string[]) => void
  placeholder?: string
}

export function NotesTagger({ value, onChange, placeholder = 'Añadir nota…' }: Props) {
  const [input, setInput] = useState('')

  const addNote = () => {
    const note = input.trim()
    if (!note || value.includes(note)) { setInput(''); return }
    onChange([...value, note])
    setInput('')
  }

  const removeNote = (index: number) => onChange(value.filter((_, i) => i !== index))

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      e.preventDefault()
      addNote()
    } else if (e.key === 'Backspace' && input === '' && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  return (
    <div className="flex min-h-12 flex-wrap gap-2 border border-stone-200 bg-white p-3 transition-colors focus-within:border-stone-900">
      {value.map((note, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 text-xs text-stone-700"
        >
          {note}
          <button
            type="button"
            onClick={() => removeNote(i)}
            className="text-stone-400 transition-colors hover:text-stone-900"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={addNote}
        placeholder={value.length === 0 ? placeholder : ''}
        className="min-w-[8rem] flex-1 bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
      />
    </div>
  )
}

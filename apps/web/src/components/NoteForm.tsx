import React, { useState, useEffect } from 'react'
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../lib/api'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Button } from './ui/Button'
import { LoadingSpinner } from './ui/LoadingSpinner'

interface NoteFormProps {
  note?: Note
  onSubmit: (data: CreateNoteRequest | UpdateNoteRequest) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export const NoteForm: React.FC<NoteFormProps> = ({
  note,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note])

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {}
    
    if (!title.trim()) {
      newErrors.title = 'Título é obrigatório'
    }
    
    if (!content.trim()) {
      newErrors.content = 'Conteúdo é obrigatório'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const data = note 
      ? { id: note.id, title: title.trim(), content: content.trim() }
      : { title: title.trim(), content: content.trim() }

    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Erro ao salvar nota:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        className="bg-secondary"
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        placeholder="Digite o título da nota..."
        disabled={isLoading}
        required
      />
      
      <Textarea
        className="bg-secondary"
        label="Conteúdo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        error={errors.content}
        placeholder="Digite o conteúdo da nota..."
        rows={6}
        disabled={isLoading}
        required
      />
      
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
          {note ? 'Atualizar' : 'Criar'} Nota
        </Button>
      </div>
    </form>
  )
}

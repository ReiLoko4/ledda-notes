import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, Note, CreateNoteRequest, UpdateNoteRequest } from '../lib/api'
import { NoteForm } from '../components/NoteForm'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { Header } from '../components/ui/Header'
import { HeroSection } from '../components/ui/HeroSection'
import { NotesGrid } from '../components/ui/NotesGrid'
import { AlertCircle } from 'lucide-react'

export const NotesPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null)
  
  const queryClient = useQueryClient()

  // Fetch notes
  const { data: notes = [], isLoading, error } = useQuery({
    queryKey: ['notes'],
    queryFn: api.getNotes,
  })

  // Create note mutation
  const createNoteMutation = useMutation({
    mutationFn: api.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      setIsCreateModalOpen(false)
    },
  })

  // Update note mutation
  const updateNoteMutation = useMutation({
    mutationFn: api.updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      setEditingNote(null)
    },
  })

  // Delete note mutation
  const deleteNoteMutation = useMutation({
    mutationFn: api.removeNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      setDeletingNoteId(null)
    },
  })

  const handleCreateNote = async (data: CreateNoteRequest) => {
    await createNoteMutation.mutateAsync(data)
  }

  const handleUpdateNote = async (data: UpdateNoteRequest) => {
    await updateNoteMutation.mutateAsync(data)
  }

  const handleDeleteNote = async () => {
    if (deletingNoteId) {
      await deleteNoteMutation.mutateAsync(deletingNoteId)
    }
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
  }

  const handleDeleteClick = (id: string) => {
    setDeletingNoteId(id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCreateNote={() => setIsCreateModalOpen(true)} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando notas...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCreateNote={() => setIsCreateModalOpen(true)} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Erro ao carregar notas</h2>
            <p className="text-muted-foreground mb-4">
              Verifique se o servidor está rodando na porta 3035
            </p>
            <Button onClick={() => window.location.reload()}>
              Tentar novamente
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCreateNote={() => setIsCreateModalOpen(true)} />
      
      {/* Hero Section or Notes Grid */}
      {notes.length === 0 ? (
        <HeroSection 
          notesCount={notes.length} 
          onCreateNote={() => setIsCreateModalOpen(true)} 
        />
      ) : (
        <NotesGrid 
          notes={notes}
          onEdit={handleEditNote}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Create Note Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Nova Nota"
      >
        <NoteForm
          onSubmit={handleCreateNote}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={createNoteMutation.isPending}
        />
      </Modal>

      {/* Edit Note Modal */}
      <Modal
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        title="Editar Nota"
      >
        {editingNote && (
          <NoteForm
            note={editingNote}
            onSubmit={handleUpdateNote}
            onCancel={() => setEditingNote(null)}
            isLoading={updateNoteMutation.isPending}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingNoteId}
        onClose={() => setDeletingNoteId(null)}
        onConfirm={handleDeleteNote}
        title="Excluir Nota"
        message="Tem certeza que deseja excluir esta nota? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        variant="destructive"
        isLoading={deleteNoteMutation.isPending}
      />
    </div>
  )
}

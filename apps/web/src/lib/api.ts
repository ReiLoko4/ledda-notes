const API_BASE_URL = '/api'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface CreateNoteRequest {
  title: string
  content: string
}

export interface UpdateNoteRequest {
  id: string
  title: string
  content: string
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text()
    throw new ApiError(response.status, errorText || response.statusText)
  }
  
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }
  
  return response.text() as T
}

export const api = {
  // GET /notes - getNotes
  async getNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes`)
    return handleResponse<Note[]>(response)
  },

  // GET /note/:id - getNoteById
  async getNoteById(id: string): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/note/${id}`)
    return handleResponse<Note>(response)
  },

  // POST /note - createNote
  async createNote(data: CreateNoteRequest): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return handleResponse<Note>(response)
  },

  // PUT /note - updateNote
  async updateNote(data: UpdateNoteRequest): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/note`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return handleResponse<Note>(response)
  },

  // DELETE /note - removeNote
  async removeNote(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/note`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    await handleResponse<void>(response)
  },
}

import { Effect } from "effect"
import { notes } from "src/db/schema.js";
import { db } from "src/db/client.js";
import { DatabaseError, NotFoundError } from "src/domain/errors.js";
import { eq } from "drizzle-orm";
import { NewNote, UpdateNote, type Note } from "src/domain/note.js";



export const NoteService = {
  getById: (id: number) =>
    Effect.tryPromise({
      try: async () => {
        const result = await db.select().from(notes).where(eq(notes.id, id)).limit(1)
        if (result.length === 0)
          throw new NotFoundError({ id })
        return result[0] as Note
      },
      catch: e => new NotFoundError({ id, cause: e })
    }),
  list: () =>
    Effect.tryPromise({
      try: () => db.select().from(notes),
      catch: e => new DatabaseError({ cause: e })
    }),
  create: (newNote: NewNote) =>
    Effect.tryPromise({
      try: async () => {
        const now = new Date()
        const [note] = await db.insert(notes).values({ title: newNote.title, content: newNote.content, createdAt: now, updatedAt: now }).returning()
        return note as Note
      },
      catch: e => new DatabaseError({ cause: e })
    }),
  update: (updateNote: UpdateNote) =>
    Effect.tryPromise({
      try: async () => {
        const [updated] = await db.update(notes).set({ title: updateNote.title, content: updateNote.content, updatedAt: new Date() }).where(eq(notes.id, updateNote.id)).returning()
        if (!updated) throw new NotFoundError({ id: updateNote.id })
        return updated as Note
      },
      catch: e => new NotFoundError({ id: updateNote.id, cause: e })
    }),
  remove: (id: number) =>
    Effect.tryPromise({
      try: async () => {
        const [deleted] = await db.delete(notes).where(eq(notes.id, id)).returning()
        if (!deleted) throw new NotFoundError({ id })
        return deleted as Note
      },
      catch: e => new NotFoundError({ id, cause: e })
    })
}



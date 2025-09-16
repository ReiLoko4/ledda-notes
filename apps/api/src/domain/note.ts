import { Schema } from "effect"

export const NoteSchema = Schema.Struct({
  id: Schema.Number,
  title: Schema.String.pipe(Schema.minLength(1)),
  content: Schema.String,
  createdAt: Schema.DateFromSelf,
  updatedAt: Schema.DateFromSelf
})

export const NewNoteSchema = Schema.Struct({
  title: Schema.String.pipe(Schema.minLength(1)),
  content: Schema.String
})

export const UpdateNoteSchema = Schema.Struct({
  id: Schema.Number,
  title: Schema.String.pipe(Schema.minLength(1)),
  content: Schema.String,
})

export type Note = Schema.Schema.Type<typeof NoteSchema>
export type NewNote = Schema.Schema.Type<typeof NewNoteSchema>
export type UpdateNote = Schema.Schema.Type<typeof UpdateNoteSchema>

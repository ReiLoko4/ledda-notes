import {
  HttpApi,
  HttpApiBuilder,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema
} from "@effect/platform"
import { Layer, Schema } from "effect"
import { NoteService } from "src/services/noteService.js"
import { NewNoteSchema, NoteSchema, UpdateNoteSchema } from "src/domain/note.js"


const idParam = HttpApiSchema.param("id", Schema.NumberFromString)

const DatabaseErrorSchema = Schema.Struct({
  _tag: Schema.Literal("DatabaseError"),
  message: Schema.String
})

const NotFoundErrorSchema = Schema.Struct({
  _tag: Schema.Literal("NotFoundError"),
  message: Schema.String,
  id: Schema.Number
})

const AppApi = HttpApi.make("app").add(
  HttpApiGroup.make("notes")
    .add(HttpApiEndpoint.get("getNotes")`/notes`.addSuccess(Schema.Array(NoteSchema)).addError(DatabaseErrorSchema))
    .add(HttpApiEndpoint.get("getNoteById")`/note/${idParam}`.addSuccess(NoteSchema).addError(NotFoundErrorSchema))
    .add(HttpApiEndpoint.post("createNote")`/note`.setPayload(NewNoteSchema).addSuccess(NoteSchema).addError(DatabaseErrorSchema))
    .add(HttpApiEndpoint.put("updateNote")`/note`.setPayload(UpdateNoteSchema).addSuccess(NoteSchema).addError(NotFoundErrorSchema))
    .add(HttpApiEndpoint.del("removeNote")`/note/`.setPayload(Schema.Struct({ id: Schema.Number })).addSuccess(NoteSchema).addError(NotFoundErrorSchema))
)

const NoteLive = HttpApiBuilder.group(AppApi, "notes", (handlers) =>
  handlers
    .handle("getNotes", () => NoteService.list())
    .handle("getNoteById", ({ path: id }) => NoteService.getById(Number(id)))
    .handle("createNote", (req) => NoteService.create(req.payload))
    .handle("updateNote", (req) => NoteService.update(req.payload))
    .handle("removeNote", (req) => NoteService.remove(req.payload.id))
)


export const ApiLive = HttpApiBuilder.api(AppApi).pipe(Layer.provide(NoteLive))



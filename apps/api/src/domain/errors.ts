import { Data } from "effect"

export class ValidationError extends Data.TaggedError("ValidationError")<{
  issues: string[]
}> { }

export class NotFoundError extends Data.TaggedError("NotFoundError")<{
  id: number,
  cause?: unknown
}> { }

export class DatabaseError extends Data.TaggedError("DatabaseError")<{
  cause: unknown
}> { }

import { Layer } from "effect";
import { HttpApiBuilder } from "@effect/platform";
import { ApiLive } from "./http/router.js";
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { createServer } from "http";

const ServerLive = HttpApiBuilder.serve().pipe(
  Layer.provide(ApiLive),
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3035 }))
)

Layer.launch(ServerLive).pipe(NodeRuntime.runMain)

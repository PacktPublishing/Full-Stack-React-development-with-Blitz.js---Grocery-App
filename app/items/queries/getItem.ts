import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetItem = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetItem), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const item = await db.item.findFirst({ where: { id } })

  if (!item) throw new NotFoundError()

  return item
})

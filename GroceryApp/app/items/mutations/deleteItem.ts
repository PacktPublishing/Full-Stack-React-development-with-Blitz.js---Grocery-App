import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteItem = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteItem), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const item = await db.item.deleteMany({ where: { id } })

  return item
})

import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateItem = z
  .object({
    name: z.string(),
    listId: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateItem), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const item = await db.item.create({ data: input })

  return item
})

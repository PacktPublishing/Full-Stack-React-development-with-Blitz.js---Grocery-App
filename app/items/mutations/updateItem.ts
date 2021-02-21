import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateItem = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateItem),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const item = await db.item.update({ where: { id }, data })

    return item
  }
)

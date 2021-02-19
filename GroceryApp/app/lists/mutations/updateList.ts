import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateList = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateList),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const list = await db.list.update({ where: { id }, data })

    return list
  }
)

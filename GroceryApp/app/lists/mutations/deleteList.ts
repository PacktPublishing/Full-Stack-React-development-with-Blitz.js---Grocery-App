import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteList = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteList), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const list = await db.list.deleteMany({ where: { id } })

  return list
})

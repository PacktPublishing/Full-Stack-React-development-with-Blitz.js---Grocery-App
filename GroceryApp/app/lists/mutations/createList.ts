import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateList = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateList), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const list = await db.list.create({ data: input })

  return list
})

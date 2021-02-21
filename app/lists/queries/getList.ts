import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetList = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetList), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const list = await db.list.findFirst({ where: { id } })

  if (!list) throw new NotFoundError()

  return list
})

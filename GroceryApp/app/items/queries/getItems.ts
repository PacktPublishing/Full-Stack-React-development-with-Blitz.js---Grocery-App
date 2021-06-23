import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetItemsInput
  extends Pick<Prisma.ItemFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetItemsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: items,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.item.count({ where }),
      query: (paginateArgs) => db.item.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      items,
      nextPage,
      hasMore,
      count,
    }
  }
)

import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetListsInput
  extends Pick<Prisma.ListFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetListsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: lists,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.list.count({ where }),
      query: (paginateArgs) => db.list.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      lists,
      nextPage,
      hasMore,
      count,
    }
  }
)

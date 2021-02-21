import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getItems from "app/items/queries/getItems"

const ITEMS_PER_PAGE = 100

export const ItemsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ items, hasMore }] = usePaginatedQuery(getItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/items/${item.id}`}>
              <a>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ItemsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Items</title>
      </Head>

      <div>
        <p>
          <Link href="/items/new">
            <a>Create Item</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ItemsList />
        </Suspense>
      </div>
    </>
  )
}

ItemsPage.authenticate = true
ItemsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ItemsPage

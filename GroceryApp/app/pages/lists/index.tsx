import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLists from "app/lists/queries/getLists"

const ITEMS_PER_PAGE = 100

export const ListsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ lists, hasMore }] = usePaginatedQuery(getLists, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <Link href={`/lists/${list.id}`}>
              <a>{list.name}</a>
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

const ListsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Lists</title>
      </Head>

      <div>
        <p>
          <Link href="/lists/new">
            <a>Create List</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ListsList />
        </Suspense>
      </div>
    </>
  )
}

ListsPage.authenticate = true
ListsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ListsPage

import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getList from "app/lists/queries/getList"
import deleteList from "app/lists/mutations/deleteList"

export const List = () => {
  const router = useRouter()
  const listId = useParam("listId", "number")
  const [deleteListMutation] = useMutation(deleteList)
  const [list] = useQuery(getList, { id: listId })

  return (
    <>
      <Head>
        <title>List {list.id}</title>
      </Head>

      <div>
        <h1>List {list.id}</h1>
        <pre>{JSON.stringify(list, null, 2)}</pre>

        <Link href={`/lists/${list.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteListMutation({ id: list.id })
              router.push("/lists")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowListPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/lists">
          <a>Lists</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <List />
      </Suspense>
    </div>
  )
}

ShowListPage.authenticate = true
ShowListPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowListPage

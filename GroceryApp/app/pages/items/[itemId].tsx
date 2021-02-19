import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getItem from "app/items/queries/getItem"
import deleteItem from "app/items/mutations/deleteItem"

export const Item = () => {
  const router = useRouter()
  const itemId = useParam("itemId", "number")
  const [deleteItemMutation] = useMutation(deleteItem)
  const [item] = useQuery(getItem, { id: itemId })

  return (
    <>
      <Head>
        <title>Item {item.id}</title>
      </Head>

      <div>
        <h1>Item {item.id}</h1>
        <pre>{JSON.stringify(item, null, 2)}</pre>

        <Link href={`/items/${item.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteItemMutation({ id: item.id })
              router.push("/items")
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

const ShowItemPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/items">
          <a>Items</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Item />
      </Suspense>
    </div>
  )
}

ShowItemPage.authenticate = true
ShowItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowItemPage

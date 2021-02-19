import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getItem from "app/items/queries/getItem"
import updateItem from "app/items/mutations/updateItem"
import { ItemForm, FORM_ERROR } from "app/items/components/ItemForm"

export const EditItem = () => {
  const router = useRouter()
  const itemId = useParam("itemId", "number")
  const [item, { setQueryData }] = useQuery(getItem, { id: itemId })
  const [updateItemMutation] = useMutation(updateItem)

  return (
    <>
      <Head>
        <title>Edit Item {item.id}</title>
      </Head>

      <div>
        <h1>Edit Item {item.id}</h1>
        <pre>{JSON.stringify(item)}</pre>

        <ItemForm
          submitText="Update Item"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateItem}
          initialValues={item}
          onSubmit={async (values) => {
            try {
              const updated = await updateItemMutation({
                id: item.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/items/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditItemPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditItem />
      </Suspense>

      <p>
        <Link href="/items">
          <a>Items</a>
        </Link>
      </p>
    </div>
  )
}

EditItemPage.authenticate = true
EditItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditItemPage

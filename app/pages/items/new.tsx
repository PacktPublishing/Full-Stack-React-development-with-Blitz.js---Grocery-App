import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createItem from "app/items/mutations/createItem"
import { ItemForm, FORM_ERROR } from "app/items/components/ItemForm"

const NewItemPage: BlitzPage = () => {
  const router = useRouter()
  const [createItemMutation] = useMutation(createItem)

  return (
    <div>
      <h1>Create New Item</h1>

      <ItemForm
        submitText="Create Item"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateItem}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const item = await createItemMutation(values)
            router.push(`/items/${item.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/items">
          <a>Items</a>
        </Link>
      </p>
    </div>
  )
}

NewItemPage.authenticate = true
NewItemPage.getLayout = (page) => <Layout title={"Create New Item"}>{page}</Layout>

export default NewItemPage

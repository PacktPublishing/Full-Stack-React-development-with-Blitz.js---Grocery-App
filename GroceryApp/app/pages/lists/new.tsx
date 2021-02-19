import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createList from "app/lists/mutations/createList"
import { ListForm, FORM_ERROR } from "app/lists/components/ListForm"

const NewListPage: BlitzPage = () => {
  const router = useRouter()
  const [createListMutation] = useMutation(createList)

  return (
    <div>
      <h1>Create New List</h1>

      <ListForm
        submitText="Create List"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateList}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const list = await createListMutation(values)
            router.push(`/lists/${list.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/lists">
          <a>Lists</a>
        </Link>
      </p>
    </div>
  )
}

NewListPage.authenticate = true
NewListPage.getLayout = (page) => <Layout title={"Create New List"}>{page}</Layout>

export default NewListPage

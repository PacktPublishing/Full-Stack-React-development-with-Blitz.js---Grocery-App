import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getList from "app/lists/queries/getList"
import updateList from "app/lists/mutations/updateList"
import { ListForm, FORM_ERROR } from "app/lists/components/ListForm"

export const EditList = () => {
  const router = useRouter()
  const listId = useParam("listId", "number")
  const [list, { setQueryData }] = useQuery(getList, { id: listId })
  const [updateListMutation] = useMutation(updateList)

  return (
    <>
      <Head>
        <title>Edit List {list.id}</title>
      </Head>

      <div>
        <h1>Edit List {list.id}</h1>
        <pre>{JSON.stringify(list)}</pre>

        <ListForm
          submitText="Update List"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateList}
          initialValues={list}
          onSubmit={async (values) => {
            try {
              const updated = await updateListMutation({
                id: list.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/lists/${updated.id}`)
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

const EditListPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditList />
      </Suspense>

      <p>
        <Link href="/lists">
          <a>Lists</a>
        </Link>
      </p>
    </div>
  )
}

EditListPage.authenticate = true
EditListPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditListPage

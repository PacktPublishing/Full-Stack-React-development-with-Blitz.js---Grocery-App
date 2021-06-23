import { useEffect, useState } from "react"
import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import emailVerification from "app/auth/mutations/emailVerification"

const EmailVerificationPage: BlitzPage = () => {
  const [loaded, setLoaded] = useState(false)
  const query = useRouterQuery()
  const [emailVerificationMutation, { isSuccess }] = useMutation(emailVerification)

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    async function verifyEmail() {
      await emailVerificationMutation({ token: query.token as string })
    }
    verifyEmail()
  }, [query.token])

  return (
    <div>
      <h1>Verify your email</h1>

      {loaded ? (
        isSuccess ? (
          <div>
            <h2>Email successfully verified</h2>
            <p>
              Go to the <Link href={Routes.Home()}>homepage</Link>
            </p>
          </div>
        ) : (
          <div>
            <h2>Error verifying email</h2>
            <p>Email verification link is invalid or it has expired.</p>
            <p>
              Go to the <Link href={Routes.Home()}>homepage</Link>
            </p>
          </div>
        )
      ) : (
        <p>Verifying...</p>
      )}
    </div>
  )
}

EmailVerificationPage.getLayout = (page) => <Layout title="Verify Your Email">{page}</Layout>

export default EmailVerificationPage

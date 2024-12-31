import Image from 'next/image'

import { getUser } from '@/actions/patient.actions'
import { RegisterForm } from '@/components/forms'

// import * as Sentry from '@sentry/nextjs'

export default async function Register({
  params: { userId },
}: SearchParamProps) {
  const user = await getUser(userId)

  // Sentry.metrics.set('user_view_register', user?.name)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="h-10 mb-12 w-fit"
          />

          <RegisterForm user={user} />

          <p className="py-12 copyright">© 2024 Care With You</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        alt="patient"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  )
}

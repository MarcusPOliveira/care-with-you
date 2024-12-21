import Image from 'next/image'
import Link from 'next/link'

import { getUser } from '@/actions/patient.actions'
import { RegisterForm } from '@/components/forms'

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const user = await getUser(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container remove-scrollbar"></section>
    </div>
  )
}

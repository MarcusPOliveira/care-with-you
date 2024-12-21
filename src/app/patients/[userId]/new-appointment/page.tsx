import Image from 'next/image'

import { getPatient } from '@/actions/patient.actions'
import { AppointmentForm } from '@/components/forms'

// import { getUser } from '@/actions/patient.actions'

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="h-10 mb-12 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="py-12 mt-10 copyright">© 2024 Care With You</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment.png"
        alt="appointment"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  )
}

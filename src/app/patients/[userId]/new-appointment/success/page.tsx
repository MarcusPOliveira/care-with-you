import Image from 'next/image'
import Link from 'next/link'

import { getAppointment } from '@/actions/appointment.actions'
import { Button } from '@/components/ui'
import { Doctors } from '@/constants'
import { formatDateTime } from '@/lib/utils'

export default async function Success({
  params: { userId },
  searchParams,
}: SearchParamProps) {
  const appointmentId = (searchParams?.appointmentId as string) || ''

  const appointment = await getAppointment(appointmentId)

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment?.primaryPhysician,
  )

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            width={280}
            height={300}
            alt="success gif"
            quality={100}
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Sua{' '}
            <span className="text-green-500">solicitação de agendamento</span>{' '}
            foi realizada com sucesso! 🎉
          </h2>
          <p>Entraremos em contato em breve para confirmação</p>
        </section>
        <section className="request-details">
          <p>Detalhes da solicitação:</p>

          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image ?? ''}
              width={100}
              height={100}
              alt="Doctor"
              className="size-6"
            />
            <p className="whitespace-nowrap"> Dr. {doctor?.name} </p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              width={24}
              height={24}
              alt="calendar icon"
            />
            <p>{formatDateTime(appointment?.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Novo agendamento
          </Link>
        </Button>
        <p className="copyright">© 2024 Care With You</p>
      </div>
    </div>
  )
}

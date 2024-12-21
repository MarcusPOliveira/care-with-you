'use client'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createAppointment } from '@/actions/appointment.actions'
import { SubmitButton } from '@/components'
import { Doctors } from '@/constants'
import { getAppointmentSchema } from '@/lib/validation'

import { CustomFormField } from './CustomFormField'
import { Form } from '../ui'
import { FormFieldType } from './PatientForm'
import { SelectItem } from '../ui/select'

interface Props {
  userId: string
  patientId: string
  type: 'create' | 'cancel' | 'schedule'
}

export const AppointmentForm = ({ userId, patientId, type }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const AppointmentFormValidation = getAppointmentSchema(type)

  let buttonLabel

  switch (type) {
    case 'create':
      buttonLabel = 'Criar agendamento'
      break
    case 'cancel':
      buttonLabel = 'Cancelar consulta'
      break
    case 'schedule':
      buttonLabel = 'Agendar consulta'
      break
    default:
      buttonLabel = 'Agendar'
      break
  }

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: '',
      schedule: new Date(),
      reason: '',
      note: '',
      cancellationReason: '',
    },
  })

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>,
  ) => {
    setIsLoading(true)

    let status

    switch (type) {
      case 'schedule':
        status = 'scheduled'
        break
      case 'cancel':
        status = 'cancelled'
        break
      default:
        status = 'pending'
        break
    }

    try {
      if (type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        }
        const appointment = await createAppointment(appointmentData)

        if (appointment) {
          form.reset()
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment?.$id}`,
          )
        }
      }
    } catch (error) {
      console.error('error onSubmit', error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log('form.formState.errors', form.formState.errors)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Novo agendamento 🗓️ </h1>
          <p className="text-dark-700">
            Preencha os campos abaixo para agendar sua consulta.
          </p>
        </section>

        {type !== 'cancel' && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Médico"
              placeholder="Selecione um médico"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className="border rounded-full border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="scheduleDate"
              label="Data da consulta"
              showTimeSelect
              dateFormat="dd/MM/yyyy HH:mm"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                label="Motivo"
                placeholder="Descreva o motivo da consulta"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="note"
                label="Observações"
                placeholder="Descreva observações adicionais"
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="cancellationReason"
              label="Motivo do cancelamento"
              placeholder="Descreva o motivo do cancelamento"
            />
          </>
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

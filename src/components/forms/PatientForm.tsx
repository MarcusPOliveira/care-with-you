'use client'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createUser } from '@/actions/patient.actions'
import { SubmitButton } from '@/components'
import { UserFormValidation } from '@/lib/validation'

import { CustomFormField } from './CustomFormField'
import { Form } from '../ui'

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

export const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: 'Marcus Silva',
      email: 'marcus@teste.com',
      phone: '+5537998336732',
    },
  })

  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true)

    try {
      const userData = { name, email, phone }
      console.log('userData', userData)
      const user = await createUser(userData)
      if (user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.error('error onSubmit', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Olá! 👋 </h1>
          <p className="text-dark-700">Agende sua consulta</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Nome completo"
          placeholder="Digite seu nome"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="Digite seu email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Telefone"
          placeholder="Digite seu telefone"
          // iconSrc="/assets/icons/phone.svg"
          // iconAlt="phone"
        />

        <SubmitButton isLoading={isLoading}>Acessar</SubmitButton>
      </form>
    </Form>
  )
}

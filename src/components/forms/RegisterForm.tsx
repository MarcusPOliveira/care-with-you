'use client'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { registerPatient } from '@/actions/patient.actions'
import { FileUploader, SubmitButton } from '@/components'
import {
  Doctors,
  genderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from '@/constants'
import { PatientFormValidation } from '@/lib/validation'

import 'react-datepicker/dist/react-datepicker.css'
import { CustomFormField } from './CustomFormField'
import { FormFieldType } from './PatientForm'
import { Form, FormControl, Label } from '../ui'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { SelectItem } from '../ui/select'

export const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  })

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true)
    console.log('values', values)

    let formData

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      })

      formData = new FormData()
      formData.append('blobFile', blobFile)
      formData.append('fileName', values.identificationDocument[0].name)
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      }

      console.log('patientData', patientData)

      const patient = await registerPatient(patientData)
      if (patient) router.push(`/patients/${user.$id}/new-appointment`)
    } catch (error) {
      console.error('error onSubmit', error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log('form.formState.errors', form.formState.errors)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Bem vindo! 👋 </h1>
          <p className="text-dark-700">
            Nos conte um pouco mais sobre você para começarmos.
          </p>
        </section>

        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h2 className="sub-header">Informações pessoais</h2>
          </div>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
          />
        </div>

        <div className="flex flex-col gap-6 xl:items-end xl:justify-center xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Data de nascimento"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gênero"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex gap-6 h-11 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {genderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Endereço completo"
            placeholder="Digite seu endereço"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Profissão"
            placeholder="Digite sua profissão"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Nome do contato de emergência"
            placeholder="Digite o nome do contato de emergência"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactPhone"
            label="Telefone do contato de emergência"
            placeholder="Digite o telefone do contato de emergência"
          />
        </div>

        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h2 className="sub-header">Informações médicas</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Médico de confiança"
          placeholder="Selecione seu médico de confiança"
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

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Plano de saúde"
            placeholder="Digite o nome do seu plano de saúde"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="insurancePolicyNumber"
            label="Telefone do contato de emergência"
            placeholder="Digite o telefone do contato de emergência"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Alergias"
            placeholder="Digite todas suas alergias"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Medicação atual"
            placeholder="Digite sua medicação atual"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Histórico médico familiar"
            placeholder="Digite seu histórico médico familiar"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Histórico médico passado"
            placeholder="Digite seu histórico médico passado"
          />
        </div>

        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h2 className="sub-header">Identificação e Verificação</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Tipo de identificação"
          placeholder="Selecione o tipo de identificação"
        >
          {IdentificationTypes.map((identificationType) => (
            <SelectItem key={identificationType} value={identificationType}>
              {identificationType}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="Número de identificação"
          placeholder="Digite o número de identificação"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Documento de identificação scaneado"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h2 className="sub-header">Consentimento e Privacidade</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="treatmentConsent"
          label="Eu concordo com o tratamento"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="disclosureConsent"
          label="Eu concordo com a divulgação de informações"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="privacyConsent"
          label="Eu concordo com a política de privacidade"
        />
        <SubmitButton isLoading={isLoading}>Confirmar</SubmitButton>
      </form>
    </Form>
  )
}

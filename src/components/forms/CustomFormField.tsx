'use client'
import { E164Number } from 'libphonenumber-js/core'
import Image from 'next/image'
import { Control } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import 'react-phone-number-input/style.css'

import { FormFieldType } from './PatientForm'

interface CustomFormFieldProps {
  control: Control<any>
  fieldType: FormFieldType
  name: string
  label?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({
  field,
  props,
}: {
  field: any
  props: CustomFormFieldProps
}) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || 'icon'}
              width={24}
              height={24}
              className="ml-2"
            />
          )}

          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            {...field}
            defaultCountry="BR"
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            placeholder={placeholder}
            className="input-phone"
          />
        </FormControl>
      )
  }
}

export const CustomFormField = (props: CustomFormFieldProps) => {
  const {
    control,
    fieldType,
    name,
    label,
    // placeholder,
    // iconSrc,
    // iconAlt,
    // disabled,
    // dateFormat,
    // showTimeSelect,
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel htmlFor={name}>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

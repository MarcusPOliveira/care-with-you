'use client'
import { useState } from 'react'

import { AppointmentForm } from './forms'
import { Button } from './ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Appointment } from '../../types/appwrite.types'

interface Props {
  type: 'schedule' | 'cancel'
  patientId: string
  userId: string
  appointment?: Appointment
  title: string
  description: string
}

export const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
  title,
  description,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const translatedType = type === 'schedule' ? 'Agendar' : 'Cancelar'

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === 'schedule' && 'text-green-500'}`}
        >
          {translatedType}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <AppointmentForm
          type={type}
          userId={userId}
          patientId={patientId}
          appointment={appointment}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  )
}

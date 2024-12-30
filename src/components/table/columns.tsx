'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

import { Doctors } from '@/constants'
import { formatDateTime } from '@/lib/utils'

import { Appointment } from '../../../types/appwrite.types'
import { AppointmentModal } from '../AppointmentModal'
import { StatusBadge } from '../StatusBadge'

export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: 'patient',
    header: 'Paciente',
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: 'Agendamento',
    cell: ({ row }) => (
      <p className="text-14-medium min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Médico',
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician,
      )

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image || ''}
            alt={doctor?.name || ''}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Ações</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Agendar consulta"
            description="Por favor, preencha os seguintes campos para agendar uma consulta"
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Cancelar consulta"
            description="Tem certeza que deseja cancelar esta consulta?"
          />
        </div>
      )
    },
  },
]

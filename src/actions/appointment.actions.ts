'use server'

import { ID, Query } from 'node-appwrite'

import { databases, getEnvVariables } from '@/lib/appwrite.config'
import { parseStringify } from '@/lib/utils'

import { Appointment } from '../../types/appwrite.types'

const { databaseId, appointmentCollectionId } = getEnvVariables()

export const createAppointment = async (
  appointment: CreateAppointmentParams,
) => {
  try {
    const newAppointment = await databases.createDocument(
      databaseId!,
      appointmentCollectionId!,
      ID.unique(),
      appointment,
    )

    console.log('newAppointment', newAppointment)

    return parseStringify(newAppointment)
  } catch (error) {
    console.error('error createAppointment', error)
  }
}

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      databaseId!,
      appointmentCollectionId!,
      appointmentId,
    )

    return parseStringify(appointment)
  } catch (error) {
    console.error('error getAppointment', error)
  }
}

export const getRecentAppointmentsList = async () => {
  try {
    const appointments = await databases.listDocuments(
      databaseId!,
      appointmentCollectionId!,
      [Query.orderDesc('$createdAt')],
    )

    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === 'scheduled') {
          acc.scheduleCount += 1
        } else if (appointment.status === 'pending') {
          acc.pendingCount += 1
        } else if (appointment.status === 'cancelled') {
          acc.cancelledCount += 1
        }

        return acc
      },
      initialCounts,
    )

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    }

    return parseStringify(data)
  } catch (error) {
    console.error('error getRecentAppointmentsList', error)
  }
}

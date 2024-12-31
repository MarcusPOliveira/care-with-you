'use server'

import { revalidatePath } from 'next/cache'
import { ID, Query } from 'node-appwrite'

import { databases, getEnvVariables, messaging } from '@/lib/appwrite.config'
import { formatDateTime, parseStringify } from '@/lib/utils'

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

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      databaseId!,
      appointmentCollectionId!,
      appointmentId,
      appointment,
    )

    if (!updatedAppointment) {
      throw new Error('Appointment not found')
    }

    const smsMessage = `Olá, nós somos do Care With You.
      ${
        type === 'schedule'
          ? `Sua consulta com o(a) Dr. ${appointment?.primaryPhysician} foi agendada para ${formatDateTime(appointment.schedule!).dateTime}.`
          : `Lamentamos informar que sua consulta com o(a) Dr. ${appointment?.primaryPhysician} foi cancelada, devido ao seguinte motivo: ${appointment.cancellationReason}.`
      }
    `
    await sendSMSNotification(userId, smsMessage)

    revalidatePath('/admin')

    return parseStringify(updatedAppointment)
  } catch (error) {
    console.error('error updateAppointment', error)
  }
}

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId],
    )

    return parseStringify(message)
  } catch (error) {
    console.error('error sendSMSNotification', error)
  }
}

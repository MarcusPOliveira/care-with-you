'use server'

import { ID } from 'node-appwrite'

import { databases, getEnvVariables } from '@/lib/appwrite.config'
import { parseStringify } from '@/lib/utils'

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

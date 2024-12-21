'use server'
import { ID, Query } from 'node-appwrite'
import { InputFile } from 'node-appwrite/file'

import {
  databases,
  getEnvVariables,
  storage,
  users,
} from '@/lib/appwrite.config'
import { parseStringify } from '@/lib/utils'

const { bucketId, databaseId, patientCollectionId, endpoint, projectId } =
  getEnvVariables()

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    )
  } catch (error: any) {
    console.error('error createUser', error)
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal('email', [user.email])])
      return documents?.users[0]
    }
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId)
    return parseStringify(user)
  } catch (error) {
    console.error('error getUser', error)
  }
}

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blob') as Blob,
        identificationDocument?.get('fileName') as string,
      )

      file = await storage.createFile(bucketId!, ID.unique(), inputFile)
    }

    console.log('file', file)

    const newPatient = await databases.createDocument(
      databaseId!,
      patientCollectionId!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${endpoint}/storage/buckets/${bucketId}/files/${file?.$id}/view?project=${projectId}`,
        ...patient,
      },
    )

    console.log('newPatient', newPatient)

    return parseStringify(newPatient)
  } catch (error) {
    console.error('error registerPatient', error)
  }
}

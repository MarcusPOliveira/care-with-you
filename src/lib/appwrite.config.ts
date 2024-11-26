import * as sdk from 'node-appwrite'

export const getEnvVariables = () => {
  return {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    databaseId: process.env.DATABASE_ID,
    patientCollectionId: process.env.PATIENT_COLLECTION_ID,
    doctorCollectionId: process.env.DOCTOR_COLLECTION_ID,
    appointmentCollectionId: process.env.APPOINTMENT_COLLECTION_ID,
    bucketId: process.env.NEXT_PUBLIC_BUCKET_ID,
    endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
  }
}

const {
  projectId,
  apiKey,
  databaseId,
  patientCollectionId,
  doctorCollectionId,
  appointmentCollectionId,
  bucketId,
  endpoint,
} = getEnvVariables()

const client = new sdk.Client()

// debug projectId and apiKey
console.log('projectId', projectId)
console.log('apiKey', apiKey)

client.setEndpoint(endpoint!).setProject(projectId!).setKey(apiKey!)

export const databases = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const messaging = new sdk.Messaging(client)
export const users = new sdk.Users(client)

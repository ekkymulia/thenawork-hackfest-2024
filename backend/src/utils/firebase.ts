import { credential } from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { getAppCheck } from "firebase-admin/app-check";
import { getFirestore, CollectionReference, DocumentData, Query } from 'firebase-admin/firestore'

// get the service account
const serviceAccount = require('./thena-hackfest-firebase-adminsdk-7320y-927c9227da.json')

// Init the firebase app
export const firebaseApp = initializeApp({
  projectId: 'thena-hackfest',
  // if we're running this on google cloud in prod (eg: Cloud Run) then it'll auto auth us.
  // So we only need the service account in dev.
  credential: process.env.NODE_ENV === 'production' ? undefined : credential.cert(serviceAccount)
})

// Export firestore 
export const firestore = getFirestore()

// Helper for collection
const createCollection = <T = DocumentData>(collectionName: string) => {
  return firestore.collection(collectionName) as CollectionReference<T>
}

// Helper buat query chain
export const queryCollection = (collectionName: string): Query<DocumentData> => {
  return firestore.collection(collectionName);
}

// Helper buat cek sesi token
export const verifyFirebaseToken = async (token: string) => {
  return await getAppCheck().verifyToken(token);
}

// model types
import { User } from '@models/user'
import { Project } from '@models/project'
import { ProjectStatus } from '../models/status';

// export collections
export const db = {
  projects: createCollection<Project>('projects'),
  users: createCollection<User>('users'),
  project_status: createCollection<ProjectStatus>('project_status')
}
// src/client.ts
import {createClient} from '@sanity/client'

export default createClient({
  projectId: 'x63r1uzi', // <-- This is YOUR project ID
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-05-01', // use a UTC date string
})
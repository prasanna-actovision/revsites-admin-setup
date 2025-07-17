import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Point to your Next.js proxy route
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // ✅ hits your proxy, which forwards to external API
  }),
  tagTypes: ['Project'], // add more as needed
  endpoints: () => ({}),
});

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiStore = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({}),
});

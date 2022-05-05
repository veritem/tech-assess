import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  id: string;
  title: string;
  body: string;
}

export const todoSlice = createApi({
  reducerPath: "/posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/posts",
  }),
  endpoints(builder) {
    return {
      fetchPosts: builder.query<Post[], void>({
        query() {
          return "/";
        },
      }),
      addPost: builder.mutation<Post, Partial<Post>>({
        query(body) {
          return {
            url: "/",
            method: "POST",
            body,
          };
        },
      }),

      updatePost: builder.mutation<Post, Partial<Post>>({
        query(body) {
          return {
            url: `/${body.id}`,
            method: "PUT",
            body,
          };
        }
      }),
      deletePost: builder.mutation<Post, { id: string }>({
        query(body) {
          return {
            url: `/${body.id}`,
            method: "DELETE",
            body,
          };
        }
      })
    };
  },
});

export const { useFetchPostsQuery, useAddPostMutation, useDeletePostMutation, useUpdatePostMutation } = todoSlice;

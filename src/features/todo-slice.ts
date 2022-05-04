import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export const todoSlice = createApi({
  reducerPath: "/todos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/users/1/todos",
  }),
  endpoints(builder) {
    return {
      fetchTodos: builder.query<Todo[], void>({
        query() {
          return "/";
        },
      }),
      addTodo: builder.mutation<Todo, Partial<Todo>>({
        query(body) {
          return {
            url: "/",
            method: "POST",
            body,
          };
        },
      }),
    };
  },
});

export const { useFetchTodosQuery, useAddTodoMutation } = todoSlice;

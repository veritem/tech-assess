import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAddPostMutation } from "../features/posts-slice";

export default function New() {
  const [value, setValue] = useState("");
  const [body, setBody] = useState("");

  const [addTodo, { isLoading }] = useAddPostMutation();

  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center py-5 flex-col my-12">
      <h1 className="text-4xl my-4 uppercase">Create new post</h1>
      <form
        className="w-full max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault();

          toast.success("Todo added!");
          await addTodo({ title: value, body });
          setValue("");
          navigate("/");
        }}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-title"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-title"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Title"
            />
          </div>

          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-title"
            >
              Body
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-title"
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Body"
            />
          </div>

          <input
            type="submit"
            value={isLoading ? "Submitting" : "Submit"}
            className="bg-blue-500 w-full cursor-pointer py-4 text-white rounded-md mx-3"
          />
        </div>
      </form>
    </section>
  );
}

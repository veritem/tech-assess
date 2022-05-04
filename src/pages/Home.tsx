import { useFetchTodosQuery } from "../features/todo-slice";

export default function Home() {

    const { data, isLoading, error } = useFetchTodosQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }


    if (error) {
        return <div>Error: {JSON.stringify(error, null, 2)} </div>
    }


    return (
        <section>
            <div className="px-20 py-5">
                <h2>Home page</h2>
            </div>
        </section>
    );
}

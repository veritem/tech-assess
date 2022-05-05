import Table from "../components/Table";
import { useFetchPostsQuery } from "../features/posts-slice";

export default function Home() {
  const { data, isLoading, error } = useFetchPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error, null, 2)} </div>;
  }

  if (!data) {
    return <div>No Data</div>;
  }

  return (
    <section>
      <div className="px-20 py-5">
        <Table data={data} />
      </div>
    </section>
  );
}

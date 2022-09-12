import useSWR from "swr";
import { Canvas } from "../components/Canvas"
import { fetcher } from "../utils";

export default function Index() {
  const { data, error } = useSWR(
    "{ events { id, title, start, end } }",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { events } = data;

  return <Canvas events={events} />;
}

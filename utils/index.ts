export const convertToHoursMinutes: (minutes: number) => string = (minutes: number) =>
  `${Math.floor(minutes / 60) || "00"}:${minutes % 60 || "00"}`;

export const fetcher = (query: string) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

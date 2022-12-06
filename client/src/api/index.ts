type ApiArgs<BodyType> = {
  method: "UPDATE" | "POST" | "GET" | "DELETE";
  url: string;
  body: BodyType;
};

export const apiCall = async <BodyType = undefined>(
  args: ApiArgs<BodyType>
) => {
  const { body, method, url } = args;
  const response = await fetch(url, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(body),
  });
  return response.json();
};

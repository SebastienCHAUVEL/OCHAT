import type { messsagePromptInput } from "../validation/prompt.validation.ts";

// Fetch Mistral 
export async function fetchMistral(messages: messsagePromptInput, model: string) {
  const url = `${process.env.MISTRAL_BASE_URL}${process.env.MISTRAL_ENDPOINT}`;
  console.log(process.env.MISTRAL_API_KEY);
  
  const response = await fetch(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages
      }),
    }
  );
  return checkMistralResponse(response);
}

export async function checkMistralResponse(response: Response) {
  // If we fail to fetch mistral response we get details and return it
  if (!response.ok) {
    const details = await response.text();

    return {
      ok: response.ok,
      message: details
    };
  }

  // Convert the json response in javascript object
  const data = await response.json();
  return {
    ok: response.ok,
    message: data.choices[0].message.content
  };
}

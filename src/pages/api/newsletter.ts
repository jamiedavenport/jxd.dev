import type { APIRoute } from "astro";
import { LoopsClient } from "loops";
import z from "zod";
import { LOOPS_API_KEY } from "astro:env/server";

export const prerender = false;

const bodySchema = z.object({
  email: z.email(),
});

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const parseResult = bodySchema.safeParse(body);

  if (!parseResult.success) {
    return new Response(JSON.stringify({ error: parseResult.error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { email } = parseResult.data;

  const loops = new LoopsClient(LOOPS_API_KEY);

  try {
    await loops.createContact({
      email,
    });
  } catch (e) {
    console.error(e);
  }

  return new Response("Ok", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

import { getStore } from "npm:@netlify/blobs";

export default async (req) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
 
  try {
    const store = getStore("budget-tracker");
    const data = await store.get("user-data", { type: "json" });
 
    if (!data) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
 
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
 
export const config = {
  path: "/api/load-data", // Updated clean path
};

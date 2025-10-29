import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

const LITE_API_SECRET_KEY = process.env.LITE_API_SECRET_KEY;
const LITE_API_BASE_URL = process.env.LITE_API_BASE_URL;

const app = new Elysia().use(cors()).group("/api", (app) =>
  app
    .get("/places/:placeId", async ({ params: { placeId }, set }) => {
      const liteApiUrl = `${LITE_API_BASE_URL}/data/places/${placeId}`;

      try {
        const response = await fetch(liteApiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-Key": LITE_API_SECRET_KEY,
          } as HeadersInit,
        });

        const data = await response.json();

        if (!response.ok) {
          set.status = response.status;
        }

        return data;
      } catch (error) {
        console.error("Proxy error:", error);
        set.status = 500;
        return { error: "Internal server error while fetching data." };
      }
    })
    .post(
      "/hotels/rates",
      async ({ body, set }) => {
        const liteApiUrl = `${LITE_API_BASE_URL}/hotels/rates`;

        try {
          const response = await fetch(liteApiUrl, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-API-Key": LITE_API_SECRET_KEY,
            } as HeadersInit,
            body: JSON.stringify(body),
          });

          const data = await response.json();

          if (!response.ok) {
            set.status = response.status;
          }

          return data;
        } catch (error) {
          console.error("Proxy error:", error);
          set.status = 500;
          return { error: "Internal server error while fetching data." };
        }
      },
      {
        body: t.Object({
          occupancies: t.Array(t.Object({ adults: t.Number() }), {
            minItems: 1,
          }),
          checkin: t.String({ format: "date" }),
          checkout: t.String({ format: "date" }),
          placeId: t.String(),
          currency: t.String(),
          guestNationality: t.String(),
        }),
      }
    )
);

if (process.env.VERCEL !== "1") {
  app.listen(process.env.PORT ?? 3000);
  console.log(
    `Proxy server is running at ${app.server?.hostname}:${app.server?.port}`
  );
}

export default app;

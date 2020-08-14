import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

export class AppConfiguration {
  static general = {
    projectName: env.DENO_PROJECT_NAME || "deno-seed",
  };

  static server = {
    env: env.DENO_ENV || "development",
    port: Number(env.DENO_PORT) || 3000,
  };

  static auth = {
    baseUrl: 'https://accounts.spotify.com/',
    client_id: "82925db2f0554cc18280feb3aea59502",
    client_secret: "9951d95fe4f94a6d8be9e63d989c94a8",
    redirect_uri: "http://localhost:3000/callback",
    scopes: "user-read-private user-read-email"
  };
}

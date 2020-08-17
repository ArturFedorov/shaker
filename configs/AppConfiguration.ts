export class AppConfiguration {
  static general = {
    projectName: Deno.env.get('DENO_PROJECT_NAME') || "shaker",
  };

  static server = {
    env: Deno.env.get('DENO_ENV') || "development",
    port: Number(Deno.env.get('DENO_PORT')) || 3000,
  };
}

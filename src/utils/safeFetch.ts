export async function safeFetch(url: string, label: string) {
  try {
    const res = await fetch(url);
    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }

    // 1. Error de HTTP
    if (!res.ok && !data) {
      console.error(
        ` Error de HTTP en ${label}\n` +
        `URL: ${url}\n` +
        `Status: ${res.status}\n` +
        `Response: ${text}`
      );

      throw new Error(`${label} HTTP failed (${res.status})`);
    }

    // 2. Error de API logico
    if (data?.status === 0) {
      console.error(
        `Error de API en ${label}\n` +
        `URL: ${url}\n` +
        `Message: ${data.status_message}\n` +
        `Response: ${JSON.stringify(data)}`
      );

      const apiError = new Error(data.status_message || "API error");
      (apiError as any).type = "api";
      throw apiError;
    }

    // 3. Exito
    console.log(`✅ fetchGames OK → ${Array.isArray(data) ? data.length : 1} items`, {
      url
    });

    return data;
  } catch (err: any) {

    if (err?.type === "api") {
      throw err;
    }

    // 4. Error de red (CORS, offline, DNS, etc.)
    console.error(
      `Network Error en ${label}\n` +
      `URL: ${url}\n` +
      `Error: ${err}`
    );

    throw err;
  }
}
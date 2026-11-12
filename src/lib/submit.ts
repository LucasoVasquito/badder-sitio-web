// Envío de formularios a un endpoint propio (Netlify Function, Formspree, etc.).
// Nunca hay credenciales acá: el endpoint es una URL pública que valida y reenvía del lado del servidor.

export interface SubmitResult { ok: boolean; reference?: string; error?: string }

/**
 * Solo devuelve ok cuando el servidor respondió 2xx.
 * Si la respuesta trae JSON con `ok: false` o `success: false`, se toma como error.
 */
export async function submitJSON(endpoint: string, payload: unknown, timeoutMs = 15000): Promise<SubmitResult> {
  if (!endpoint) return { ok: false, error: "El envío no está configurado." };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    let data: Record<string, unknown> = {};
    try {
      data = await res.json();
    } catch {
      /* respuesta sin JSON */
    }
    if (!res.ok || data.ok === false || data.success === false) {
      return { ok: false, error: (data.message as string) || `El servidor respondió con error (${res.status}).` };
    }
    const reference = (data.reference ?? data.orderId ?? data.id) as string | undefined;
    return { ok: true, reference };
  } catch (e) {
    const aborted = e instanceof DOMException && e.name === "AbortError";
    return { ok: false, error: aborted ? "El servidor tardó demasiado en responder." : "No se pudo conectar con el servidor." };
  } finally {
    clearTimeout(timer);
  }
}

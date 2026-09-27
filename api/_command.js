// ─────────────────────────────────────────────────────────────
// CSRA — émetteur d'événements COCO COMMAND
//
// Pousse un événement unique vers l'API d'ingestion de COCO COMMAND (le moteur
// vit dans le dépôt jamin-depth, src/command/). Le format est le contrat
// partagé par tous les projets ; ici `venture` vaut toujours "RUGBY".
//
// Calqué sur coco2/api/_command.js — même pattern fetch, aucune dépendance.
// Se dégrade en silence si COMMAND_API_URL / COMMAND_INGEST_TOKEN ne sont pas
// configurés : un formulaire ne doit jamais casser parce qu'une variable
// d'environnement manque.
//
// Variables attendues (Vercel → Settings → Environment Variables) :
//   COMMAND_API_URL       https://<jamin-depth>/api/command/events
//   COMMAND_INGEST_TOKEN  le même jeton que sur jamin-depth et coco2
// ─────────────────────────────────────────────────────────────

/**
 * @param {object} event  événement au format COCO COMMAND
 * @returns {Promise<{ok: boolean, status?: number, reason?: string}>}
 */
export async function notifyCommand(event) {
  const url = process.env.COMMAND_API_URL;
  const token = process.env.COMMAND_INGEST_TOKEN;
  if (!url || !token) return { ok: false, reason: "not-configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ repo: "Coconut-Samui-Rugby-Academy", ...event, venture: "RUGBY" }),
    });
    // On lit le statut : contrairement au chat de coco2, ici on a le droit
    // d'attendre la réponse — un lead perdu coûte plus cher que 300 ms.
    return { ok: res.ok, status: res.status, reason: res.ok ? undefined : await res.text().catch(() => "") };
  } catch (err) {
    return { ok: false, reason: err && err.message ? err.message : "fetch-failed" };
  }
}

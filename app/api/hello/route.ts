/**
 * Hello API Route
 *
 * Simple example API endpoints for testing GET and POST requests.
 *
 * @example
 * GET /api/hello
 * Response: { message: "Hello from the API!", timestamp: "...", status: "ok" }
 *
 * POST /api/hello
 * Body: { any: "data" }
 * Response: { message: "Data received", data: { ... }, timestamp: "..." }
 */

/**
 * GET handler - Returns a simple hello message with timestamp
 */
export async function GET(): Promise<Response> {
  return Response.json({
    message: "Hello from the API!",
    timestamp: new Date().toISOString(),
    status: "ok",
  })
}

/**
 * POST handler - Echoes back the received JSON data
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json()

    return Response.json({
      message: "Data received",
      data: body,
      timestamp: new Date().toISOString(),
    })
  } catch {
    return Response.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    )
  }
}

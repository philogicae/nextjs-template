export async function GET() {
  return Response.json({
    message: "Hello from the API!",
    timestamp: new Date().toISOString(),
    status: "ok",
  })
}

export async function POST(request: Request) {
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

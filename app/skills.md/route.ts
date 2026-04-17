import { readFileSync } from "node:fs"
import { join } from "node:path"

/**
 * GET handler - Returns the raw SKILLS.md file content
 *
 * Accessible at: /skills.md
 * Returns: Raw markdown text
 */
export async function GET(): Promise<Response> {
  try {
    const skillsPath = join(process.cwd(), "SKILLS.md")
    const content = readFileSync(skillsPath, "utf-8")

    return new Response(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  } catch (error) {
    return new Response(
      `Error: ${error instanceof Error ? error.message : "Failed to read SKILLS.md"}`,
      { status: 500 }
    )
  }
}

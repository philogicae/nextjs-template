import { readFileSync } from "node:fs"
import { join } from "node:path"
import { unstable_cache } from "next/cache"

/**
 * Cached file reader for SKILLS.md
 * Caches the content for 1 hour to avoid unnecessary file reads
 */
const getSkillsContent = unstable_cache(
  async (): Promise<string> => {
    const skillsPath = join(process.cwd(), "SKILLS.md")
    return readFileSync(skillsPath, "utf-8")
  },
  ["skills-md-content"],
  { revalidate: 3600, tags: ["skills-md"] }
)

/**
 * GET handler - Returns the raw SKILLS.md file content
 *
 * Accessible at: /skills.md
 * Returns: Raw markdown text
 *
 * Cached for 1 hour for optimal performance.
 */
export async function GET(): Promise<Response> {
  try {
    const content = await getSkillsContent()

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

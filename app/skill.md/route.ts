import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { unstable_cache } from "next/cache"
import { version as appVersion } from "../../package.json"

/**
 * Cached file reader for SKILL.md.
 * Uses async fs/promises and caches the content for 1 hour to avoid
 * repeated disk reads. Revalidate on demand with `revalidateTag("skill-md")`.
 */
const getSkillContent = unstable_cache(
  async (): Promise<string> =>
    readFile(join(process.cwd(), "SKILL.md"), "utf-8"),
  ["skill-md-content"],
  { revalidate: 3600, tags: ["skill-md"] }
)

/** Regex to match version in YAML frontmatter (e.g., `version: "1.0.0"`). Matches at line start with optional indentation. */
const VERSION_REGEX = /^(\s*version:\s*")[^"]*("\s*)$/m

/** Serves SKILL.md as raw markdown at `/skill.md`, with version auto-synced from package.json. */
export async function GET(): Promise<Response> {
  try {
    const content = await getSkillContent()
    const updatedContent = content.replace(VERSION_REGEX, `$1${appVersion}$2`)

    return new Response(updatedContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  } catch (error) {
    return new Response(
      `Error: ${error instanceof Error ? error.message : "Failed to read SKILL.md"}`,
      { status: 500 }
    )
  }
}

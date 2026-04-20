import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { unstable_cache } from "next/cache"
import { version as appVersion } from "../../package.json"

/**
 * Cached file reader for SKILLS.md.
 * Uses async fs/promises and caches the content for 1 hour to avoid
 * repeated disk reads. Revalidate on demand with `revalidateTag("skills-md")`.
 */
const getSkillsContent = unstable_cache(
  async (): Promise<string> =>
    readFile(join(process.cwd(), "SKILLS.md"), "utf-8"),
  ["skills-md-content"],
  { revalidate: 3600, tags: ["skills-md"] }
)

/** Regex to match version in YAML frontmatter (e.g., `version: "1.0.0"`). Matches at line start with optional indentation. */
const VERSION_REGEX = /^(\s*version:\s*")[^"]*("\s*)$/m

/** Serves SKILLS.md as raw markdown at `/skills.md`, with version auto-synced from package.json. */
export async function GET(): Promise<Response> {
  try {
    const content = await getSkillsContent()
    const updatedContent = content.replace(VERSION_REGEX, `$1${appVersion}$2`)

    return new Response(updatedContent, {
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

import JSZip from 'jszip'

export interface SkillFile {
  path: string
  content: string;
}

/**
 * Creates a JSZip instance for the skill files.
 */
export const createSkillZip = async (
  skillName: string,
  skillMd: string,
  extraFiles: SkillFile[] = []
): Promise<JSZip> => {
  const zip = new JSZip()
  
  // Normalize skill folder name (kebab-case)
  const dirName = skillName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') || 'my-custom-skill'
  
  const skillFolder = zip.folder(dirName)
  if (!skillFolder) {
    throw new Error('Failed to create skill directory in ZIP archive')
  }

  // 1. Add SKILL.md
  skillFolder.file('SKILL.md', skillMd)

  // 2. Add extra files (e.g. scripts/run.py, references/guide.md)
  extraFiles.forEach((file) => {
    // Normalize path separators to forward slashes for zip
    const normalizedPath = file.path.replace(/\\/g, '/')
    skillFolder.file(normalizedPath, file.content)
  })

  return zip
}

/**
 * Generates an ArrayBuffer representation of the zip, ideal for returning in Route Handlers.
 */
export const generateSkillZipBuffer = async (
  skillName: string,
  skillMd: string,
  extraFiles: SkillFile[] = []
): Promise<Uint8Array> => {
  const zip = await createSkillZip(skillName, skillMd, extraFiles)
  return await zip.generateAsync({ type: 'uint8array' })
}

import { NextResponse } from 'next/server'
import { generateSkillZipBuffer } from '@/lib/packager'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { skillName, skillMd, files } = body

    if (!skillName || !skillMd) {
      return NextResponse.json(
        { error: 'Missing required parameters: skillName and skillMd are mandatory.' },
        { status: 400 }
      )
    }

    // Generate ZIP buffer as a Uint8Array
    const zipBuffer = await generateSkillZipBuffer(skillName, skillMd, files || [])
    const slug = skillName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') || 'my-custom-skill'

    return new Response(new Blob([zipBuffer as any]), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${slug}.skill.zip"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error: any) {
    console.error('Error in API Export Route:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to construct skill package.' },
      { status: 500 }
    )
  }
}

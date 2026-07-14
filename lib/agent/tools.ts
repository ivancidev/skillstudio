import { z } from 'zod'

export const agentTools = {
  askQuestion: {
    description: 'Ask the developer a specific clarifying question to gather more context about the skill requirements.',
    parameters: z.object({
      question: z.string().describe('The clarifying question to ask the developer.'),
    }),
    execute: async (args: { question: string }) => args,
  },
  
  generateSkillMd: {
    description: 'Generate the main SKILL.md file content based on the developer requirements.',
    parameters: z.object({
      name: z.string().describe('Name of the skill in clean title case (e.g. "Instagram Carousel Designer" or "Tailwind Refactoring Agent").'),
      slug: z.string().describe('Kebab-case slug for the folder name (e.g. "carousel-instagram").'),
      platform: z.enum(['claude', 'cursor', 'windsurf', 'gpt', 'all']).describe('AI assistant or editor this skill is primarily designed for.'),
      content: z.string().describe('Full markdown content of the SKILL.md file, following standard skill formats (frontmatter with name and description, trigger examples, step-by-step instructions, and input/output examples).'),
    }),
    execute: async (args: { name: string; slug: string; platform: 'claude' | 'cursor' | 'windsurf' | 'gpt' | 'all'; content: string }) => args,
  },
  
  generateScript: {
    description: 'Generate an additional supporting script (like Python, Shell, Node.js) or a template file that goes alongside the SKILL.md inside the zip package.',
    parameters: z.object({
      path: z.string().describe('Relative path of the script in the skill folder (e.g., "scripts/run.py" or "templates/layout.html").'),
      content: z.string().describe('Complete code contents of the script or configuration file.'),
    }),
    execute: async (args: { path: string; content: string }) => args,
  },
  
  validateSkill: {
    description: 'Validate that the generated skill is complete, contains trigger phrases, clear instructions, and conforms to standard formats.',
    parameters: z.object({
      isValid: z.boolean().describe('Whether the skill contains all required sections (frontmatter, triggers, instructions, examples).'),
      errors: z.array(z.string()).optional().describe('List of validation errors if the skill is invalid.'),
      suggestions: z.array(z.string()).optional().describe('Actionable improvements for the skill structure.'),
    }),
    execute: async (args: { isValid: boolean; errors?: string[]; suggestions?: string[] }) => args,
  },
  
  packageSkill: {
    description: 'Signal that the skill is complete, validated, and ready for packaging and downloading.',
    parameters: z.object({
      ready: z.boolean().describe('Set to true to finalize and package the skill.'),
      summary: z.string().describe('A brief, friendly message summarizing what was packaged and how to install it.'),
    }),
    execute: async (args: { ready: boolean; summary: string }) => args,
  },
}

import { defineCollection, z } from 'astro:content';

const lessonSchema = z.object({
  title: z.string(),
  module: z.number(),
  objective: z.string(),
  visualExplanation: z.array(z.string()).optional(),
  examples: z.array(z.object({
    eng: z.string(),
    vie: z.string(),
    note: z.string().optional()
  })),
  commonMistakes: z.array(z.object({
    mistake: z.string(),
    correction: z.string(),
    explanation: z.string()
  })),
  memoryTips: z.array(z.string()),
  cheatSheet: z.array(z.string()),
  summary: z.string(),
  flashcards: z.array(z.object({
    front: z.string(),
    back: z.string()
  })),
  miniQuiz: z.array(z.object({
    question: z.string(),
    options: z.array(z.string()),
    answer: z.string(),
    explanation: z.string()
  })),
  homework: z.array(z.object({
    question: z.string(),
    answer: z.string()
  }))
});

const grammarCollection = defineCollection({
  type: 'content',
  schema: lessonSchema,
});

const listeningCollection = defineCollection({
  type: 'content',
  schema: lessonSchema,
});

export const collections = {
  'grammar': grammarCollection,
  'listening': listeningCollection,
};

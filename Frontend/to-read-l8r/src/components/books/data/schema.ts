import { z } from "zod";

export const booksSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  country: z.string(),
  language: z.string(),
  link: z.string(),
  pages: z.number(),
  year: z.number(),
});

export type Book = z.infer<typeof booksSchema>;

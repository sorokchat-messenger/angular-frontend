import z from "zod";

export const SearchSchema = z.object({
    search: z.string({ error: "Значення для пошуку має бути рядком" })
});

export type SearchPayload = z.infer<typeof SearchSchema>;
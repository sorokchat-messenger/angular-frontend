import z from "zod";

export const SendMessageSchema = z.object({
    text: z.string()
});

export type SendMessagePayload = z.infer<typeof SendMessageSchema>;
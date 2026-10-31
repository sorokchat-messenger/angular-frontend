import z from "zod";

export const MessageSchema = z.object({
    chatId: z.uuidv7(),
    authorId: z.uuidv7(),
    text: z.string(),
    iv: z.string()
});

export type MessagePayload = z.infer<typeof MessageSchema>;
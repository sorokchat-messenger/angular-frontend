import { validateTree, type PathKind, type SchemaPath } from "@angular/forms/signals";
import { type ZodType } from 'zod';

export function withZod<T>(schema: ZodType<T>) {
    return (path: SchemaPath<unknown, 1, PathKind.Root>) => {
        validateTree(path, (context) => {
            const rawValue = context.value() as Record<string, unknown>;
            const transformedValue: Record<string, unknown> = {};
            Object.keys(rawValue).forEach(key => {
                const value = rawValue[key];
                if (typeof value !== 'string' || value.trim() !== '') {
                    transformedValue[key] = value;
                }
            });
            const result = schema.safeParse(transformedValue);
            if (result.success) {
                return null;
            }

            return result.error.issues.map(issue => ({
                kind: issue.code,
                message: issue.message,
                path: issue.path,
            }));
        })
    }
}
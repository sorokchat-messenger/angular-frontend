import {
    type ReadonlyFieldTree,
    validateTree,
    type PathKind,
    type SchemaPath,
    type ValidationError,
} from "@angular/forms/signals";
import z, { type ZodType } from 'zod';
import { withoutEmpty } from "./without-empty.util";
import { inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

type PathType = SchemaPath<unknown, 1, PathKind.Root>;
type FieldTreeNode = ReadonlyFieldTree<unknown, string | number>;

function resolveFieldTree(
    rootFieldTree: PathType,
    pathSegments: (string | number)[]
) {
    let current: unknown = rootFieldTree;
    for (const segment of pathSegments) {
        if (current === null || typeof current !== 'object' || !(current)) return undefined;
        current = (current as Record<string | number, unknown>)[segment];
    }
    return current;
}

function resolveTranslation(issue: z.core.$ZodIssue): { key: string; params?: Record<string, unknown> } {
    switch (issue.code) {
        case 'too_small':
            return {
                key: issue.message,
                params: { min: issue.minimum }
            };
        case 'too_big':
            return {
                key: issue.message,
                params: { max: issue.maximum }
            };
        default:
            return { key: issue.message };
    }
}

export function withZod<T>(schema: ZodType<T>) {
    const translation: TranslateService = inject(TranslateService);
    return (path: PathType) => {
        validateTree(path, (context) => {
            const rawValue = context.value() as Record<string, unknown>;
            const transformedValue = withoutEmpty(rawValue);
            const result = schema.safeParse(transformedValue);
            if (result.success) return null;
            return result.error.issues.map(
                (issue): ValidationError.WithOptionalFieldTree => {
                    const { key, params } = resolveTranslation(issue);
                    const message: string = translation.instant(key, params);
                    if (issue.path.length === 0) {
                        return { kind: issue.code, message }
                    }
                    const targetSchemaPath = resolveFieldTree(path, issue.path as (string | number)[]);
                    const targetFieldTree: FieldTreeNode | undefined = targetSchemaPath ? context.fieldTreeOf(targetSchemaPath as PathType) : undefined;
                    if (!targetFieldTree) {
                        return {
                            kind: issue.code,
                            message
                        }
                    }
                    return {
                        kind: issue.code,
                        message,
                        fieldTree: targetFieldTree
                    }
                }
            );
        });
    };
}
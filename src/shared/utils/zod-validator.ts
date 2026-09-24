import {
    type ReadonlyFieldTree,
    validateTree,
    type PathKind,
    type SchemaPath,
    type ValidationError,
} from "@angular/forms/signals";
import { type ZodType } from 'zod';
import { withoutEmpty } from "./without-empty.util";

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

export function withZod<T>(schema: ZodType<T>) {
    return (path: PathType) => {
        validateTree(path, (context) => {
            const rawValue = context.value() as Record<string, unknown>;
            const transformedValue = withoutEmpty(rawValue);
            console.log(transformedValue);

            const result = schema.safeParse(transformedValue);
            if (result.success) return null;
            return result.error.issues.map(
                (issue): ValidationError.WithOptionalFieldTree => {
                    if (issue.path.length === 0) {
                        return { kind: issue.code, message: issue.message }
                    }
                    const targetSchemaPath = resolveFieldTree(path, issue.path as (string | number)[]);
                    const targetFieldTree: FieldTreeNode | undefined = targetSchemaPath ? context.fieldTreeOf(targetSchemaPath as PathType) : undefined;
                    if (!targetFieldTree) {
                        return {
                            kind: issue.code,
                            message: issue.message
                        }
                    }
                    return {
                        kind: issue.code,
                        message: issue.message,
                        fieldTree: targetFieldTree
                    }
                }
            );
        });
    };
}
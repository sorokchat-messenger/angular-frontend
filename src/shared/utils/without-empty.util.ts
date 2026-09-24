export function withoutEmpty<T>(object: Required<T>): T {
    const transformedValue: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(object)) {
        if (typeof value === 'string' && value.trim() === '') {
            continue;
        }
        transformedValue[key] = value;
    }
    return transformedValue as T;
}
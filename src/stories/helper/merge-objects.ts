export function mergeObjects<T extends Record<string, unknown>>(
  obj: T,
  keys: (keyof T)[]
): Record<string, unknown> {
  return keys.reduce((acc, cur) => {
    const value = obj[cur];
    if (typeof value === "object" && value !== null) {
      return Object.assign(acc, value);
    }
    return acc;
  }, {} as Record<string, unknown>);
}

// 使用示例

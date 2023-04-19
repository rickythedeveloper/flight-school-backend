export const checkSerialObjectType = <T extends Record<string, any>> (obj: unknown, example: T): obj is T => {
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  for (const field in example) {
    const fieldExistsAsCorrectType =
      field in obj &&
      typeof obj[field as keyof typeof obj] === typeof example[field]
    if (!fieldExistsAsCorrectType) {
      return false
    }
  }

  for (const field in obj) {
    if (!(field in example)) {
      return false
    }
  }

  return true
}

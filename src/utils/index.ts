export const formatInputDate = (date: Date) => date.toISOString().split('T').at(0) as string

export const randomID = () => crypto.randomUUID() as string


export interface AddHabit {
    name: string,
    description: string | null,
    days: string | null,
    createDate: string,
    priority: string,
    noteId: string | null,
    biggestStreak: string | null,
}
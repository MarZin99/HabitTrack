export const HABITS = [
    {
        name: "Morning meditation",
        createDate: Date.now().toString(),
        days: "127",
        priority: "1",
        noteId: undefined,
        biggestStreak: "0",
    },
    {
        name: "Working out ",
        createDate: Date.now().toString(),
        days: "62",
        priority: "2",
        noteId: undefined,
        biggestStreak: "0",
    },
    {
        name: "Book reading",
        createDate: Date.now().toString(),
        days: "127",
        priority: "2",
        noteId: "2",
        biggestStreak: "0",
    },
    {
        name: "Programming lessons",
        createDate: Date.now().toString(),
        days: "127",
        priority: "3",
        noteId: undefined,
        biggestStreak: "0",
    }
]

export const NOTES = [
    {text: "I would like to perform some meditation and test how it affect my morning routine"},
    {text: "I found pretty nice book and want to finish it by the end of the month"},
    {text: "First Meditation. I dot feel it yet"}
]

export const HABITOCURENCES = [
    {
        habitId: 1,
        date: new Date("27-03-2025").toString(),
        completed: 1,
        noteId:3,
    },
    {
        habitId: 1,
        date: new Date("28-03-2025").toString(),
        completed: 1,
        noteId:undefined,
    },
    {
        habitId: 1,
        date: new Date("29-03-2025").toString(),
        completed: 1,
        noteId:undefined,
    },
]
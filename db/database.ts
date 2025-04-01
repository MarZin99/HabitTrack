import {sqliteTable, integer, text, numeric, } from 'drizzle-orm/sqlite-core';

export const habit = sqliteTable("habit", {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    description: text('description'),
    days: numeric('days'),
    createDate: text('createDate').notNull(),
    priority: numeric('priority').notNull(),
    noteId: numeric('noteId').references(() => note.id),
    biggestStreak: numeric('streak'),
})

export const habitOccurences = sqliteTable('habitOccurences', {
    id: integer('id').primaryKey({autoIncrement: true}),
    habitId: integer('habitId').references(() => habit.id),
    date: text('createDate').notNull(),
    completed: integer("completed").notNull().default(0),
    noteId: integer('noteId').references(() => note.id),
})

export const note = sqliteTable('note', {
    id: integer('id').primaryKey({autoIncrement: true}),
    text: text('text').notNull(),
})

export type Habit = typeof habit.$inferSelect;
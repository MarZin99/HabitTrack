import {sqliteTable, integer, text, numeric, } from 'drizzle-orm/sqlite-core';

export const habit = sqliteTable("habit", {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    description: text('description'),
    createDate: text('createDate').notNull(),
    priority: numeric('priority').notNull(),
    noteId: numeric('noteId').references(() => note.id),
    biggestStreak: numeric('streak'),
})

export const habitSchedule = sqliteTable('habitOccurences', {
    id: integer('id').primaryKey({autoIncrement: true}),
    habitId: integer('habitId').references(() => habit.id),
    type: integer('type').notNull(),
    interval: integer('interval'),
    dayOfWeek: integer('dayOfWeek'),
    dayOfMonth: integer('dayOfMonth'),
    month: integer('month'),
    date: text('date'),
    createDate: text('createDate').notNull(),
    ordinal: integer('ordinal'),
    completed: integer("completed").notNull().default(0),
    noteId: integer('noteId').references(() => note.id),
})

export const note = sqliteTable('note', {
    id: integer('id').primaryKey({autoIncrement: true}),
    text: text('text').notNull(),
})

export type Habit = typeof habit.$inferSelect;
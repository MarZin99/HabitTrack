import {sqliteTable, integer, text, numeric} from 'drizzle-orm/sqlite-core';

export const habits = sqliteTable("habits", {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    createDate: text('createDate').notNull(),
    days: numeric('days'), //Add hours?
    type: numeric('type'),
    priority: numeric('priority').notNull(),
    noteId: numeric('noteId').references(() => notes.id),
    //icon: text("icon"),
    streak: numeric('streak').notNull(),
})

export const notes = sqliteTable('notes', {
    id: integer('id').primaryKey({autoIncrement: true}),
    text: text('text').notNull(),
})

export type Habit = typeof habits.$inferSelect;
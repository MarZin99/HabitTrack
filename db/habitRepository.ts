import { drizzle } from "drizzle-orm/expo-sqlite";
import { habit } from "./database";
import { openDatabaseSync } from "expo-sqlite";
import { AddHabit } from "@/models/Habit.model";
import { eq } from "drizzle-orm";
const DATABASE_NAME = "habits"

const db = drizzle(openDatabaseSync(DATABASE_NAME));

export const addHabit = async (addHabit: AddHabit) => {
    await db.insert(habit).values(addHabit)
}

export const deleteHabit = async (id: number) => {
    await db.delete(habit).where(eq(habit.id, id))
}

export const updateHabit = async (id: number, updateHabit : AddHabit) => {
    await db.update(habit).set(updateHabit).where(eq(habit.id, id));
}
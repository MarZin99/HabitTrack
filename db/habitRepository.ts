import { drizzle } from "drizzle-orm/expo-sqlite";
import { habit } from "./database";
import { openDatabaseSync } from "expo-sqlite";
import { AddHabit } from "@/models/Habit.model";
import { eq } from "drizzle-orm";
const DATABASE_NAME = "habits"

const connect = (DB_NAME: string) => {
    const expoDb = openDatabaseSync(DB_NAME);
    return drizzle(expoDb);
}

export const addHabit = async (addHabit: AddHabit) => {
    const db = connect(DATABASE_NAME);
    await db.insert(habit).values(addHabit)
}

export const deleteHabit = async (id: number) => {
    const db = connect(DATABASE_NAME);
    await db.delete(habit).where(eq(habit.id, id))
}

export const updateHabit = async (id: number, updateHabit : AddHabit) => {
    const db = connect(DATABASE_NAME);
    await db.update(habit).set(updateHabit).where(eq(habit.id, id));
}
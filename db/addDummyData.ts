import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

import AsyncStorage from 'expo-sqlite/kv-store';
import { notes, habits } from "./database";
import { HABITS, NOTES } from "./dummyData";



export const addDummyData = async (db: ExpoSQLiteDatabase) => {
    const value = AsyncStorage.getItemSync('dbInitialized');
    if (value) return;

    console.log("Inserting dummy data")


    await db.insert(notes).values(NOTES)
    await db.insert(habits).values(HABITS);

}
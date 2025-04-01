
import AsyncStorage from 'expo-sqlite/kv-store';
import { note, habit, habitOccurences } from "./database";
import { HABITOCURENCES, HABITS, NOTES } from "./dummyData";
import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from "@/drizzle/migrations";

const DATABASE_NAME = "habits"


export const addDummyData = async () => {

const expoDb = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDb);
  
  const {success, error} = useMigrations(db, migrations);

  if(success) {
    const value = AsyncStorage.getItemSync('dbInitialized');
    if (value) return;

    await db.delete(note);
    await db.delete(habit);
    await db.delete(habitOccurences);

    await db.insert(note).values(NOTES);
    await db.insert(habit).values(HABITS);
    await db.insert(habitOccurences).values(HABITOCURENCES);
  }
}
import type {Config} from 'drizzle-kit'

export default {
    schema: './db/database.ts',
    out: './drizzle',
    dialect: 'sqlite',
    driver: 'expo',
} satisfies Config;
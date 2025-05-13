ALTER TABLE `notes` RENAME TO `note`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_habit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`createDate` text NOT NULL,
	`priority` numeric NOT NULL,
	`noteId` numeric,
	`streak` numeric,
	FOREIGN KEY (`noteId`) REFERENCES `note`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_habit`("id", "name", "description", "createDate", "priority", "noteId", "streak") SELECT "id", "name", "description", "createDate", "priority", "noteId", "streak" FROM `habit`;--> statement-breakpoint
DROP TABLE `habit`;--> statement-breakpoint
ALTER TABLE `__new_habit` RENAME TO `habit`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_habitOccurences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`habitId` integer,
	`type` integer NOT NULL,
	`interval` integer,
	`dayOfWeek` integer,
	`dayOfMonth` integer,
	`month` integer,
	`date` text,
	`createDate` text NOT NULL,
	`ordinal` integer,
	`completed` integer DEFAULT 0 NOT NULL,
	`noteId` integer,
	FOREIGN KEY (`habitId`) REFERENCES `habit`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`noteId`) REFERENCES `note`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_habitOccurences`("id", "habitId", "type", "interval", "dayOfWeek", "dayOfMonth", "month", "date", "createDate", "ordinal", "completed", "noteId") SELECT "id", "habitId", "type", "interval", "dayOfWeek", "dayOfMonth", "month", "date", "createDate", "ordinal", "completed", "noteId" FROM `habitOccurences`;--> statement-breakpoint
DROP TABLE `habitOccurences`;--> statement-breakpoint
ALTER TABLE `__new_habitOccurences` RENAME TO `habitOccurences`;
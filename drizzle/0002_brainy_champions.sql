ALTER TABLE `habits` RENAME TO `habit`;--> statement-breakpoint
CREATE TABLE `habitOccurences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`habitId` numeric,
	`createDate` text NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL,
	`noteId` numeric,
	FOREIGN KEY (`habitId`) REFERENCES `habit`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`noteId`) REFERENCES `notes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_habit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`days` numeric,
	`createDate` text NOT NULL,
	`priority` numeric NOT NULL,
	`noteId` numeric,
	`streak` numeric,
	FOREIGN KEY (`noteId`) REFERENCES `notes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_habit`("id", "name", "description", "days", "createDate", "priority", "noteId", "streak") SELECT "id", "name", "description", "days", "createDate", "priority", "noteId", "streak" FROM `habit`;--> statement-breakpoint
DROP TABLE `habit`;--> statement-breakpoint
ALTER TABLE `__new_habit` RENAME TO `habit`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
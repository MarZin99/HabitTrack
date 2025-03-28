PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_habits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createDate` text NOT NULL,
	`days` numeric,
	`type` numeric,
	`priority` numeric NOT NULL,
	`noteId` numeric,
	`streak` numeric NOT NULL,
	FOREIGN KEY (`noteId`) REFERENCES `notes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_habits`("id", "name", "createDate", "days", "type", "priority", "noteId", "streak") SELECT "id", "name", "createDate", "days", "type", "priority", "noteId", "streak" FROM `habits`;--> statement-breakpoint
DROP TABLE `habits`;--> statement-breakpoint
ALTER TABLE `__new_habits` RENAME TO `habits`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
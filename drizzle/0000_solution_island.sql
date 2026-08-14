CREATE TABLE IF NOT EXISTS `progress` (`user_id` text PRIMARY KEY NOT NULL,`email` text NOT NULL,`display_name` text NOT NULL,`state` text DEFAULT '{}' NOT NULL,`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `admins` (`user_id` text PRIMARY KEY NOT NULL,`email` text NOT NULL,`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_progress_updated_at` ON `progress` (`updated_at`);

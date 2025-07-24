import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  projectType: varchar("project_type", { length: 100 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  capacity: varchar("capacity", { length: 100 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const installers = pgTable("installers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  region: varchar("region", { length: 100 }).notNull(),
  experience: varchar("experience", { length: 50 }).notNull(),
  systemTypes: text("system_types").notNull(),
  certifications: text("certifications"),
  rating: integer("rating").default(5),
  totalInstalls: integer("total_installs").default(0),
  imageUrl: varchar("image_url", { length: 500 }),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const installerReviews = pgTable("installer_reviews", {
  id: serial("id").primaryKey(),
  installerId: integer("installer_id").references(() => installers.id).notNull(),
  clientName: varchar("client_name", { length: 100 }).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  projectType: varchar("project_type", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  firstName: true,
  lastName: true,
  email: true,
  company: true,
  projectType: true,
  message: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  location: true,
  capacity: true,
  description: true,
  status: true,
  imageUrl: true,
});

export const insertInstallerSchema = createInsertSchema(installers).pick({
  name: true,
  region: true,
  experience: true,
  systemTypes: true,
  certifications: true,
  rating: true,
  totalInstalls: true,
  imageUrl: true,
  description: true,
  isActive: true,
});

export const quoteSubmissions = pgTable("quote_submissions", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  location: varchar("location", { length: 100 }).notNull(),
  projectType: varchar("project_type", { length: 100 }).notNull(),
  systemSpecs: text("system_specs"),
  estimatedBudget: varchar("estimated_budget", { length: 100 }),
  message: text("message"),
  priorityScore: integer("priority_score").default(0),
  urgencyLevel: varchar("urgency_level", { length: 20 }).default("medium"),
  readinessToBuy: varchar("readiness_to_buy", { length: 20 }).default("medium"),
  followUpStatus: varchar("follow_up_status", { length: 50 }).default("pending"),
  assignedTo: varchar("assigned_to", { length: 100 }),
  lastContactDate: timestamp("last_contact_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emailTemplates = pgTable("email_templates", {
  id: serial("id").primaryKey(),
  templateType: varchar("template_type", { length: 50 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emailHistory = pgTable("email_history", {
  id: serial("id").primaryKey(),
  quoteId: integer("quote_id").references(() => quoteSubmissions.id),
  contactId: integer("contact_id").references(() => contactSubmissions.id),
  templateType: varchar("template_type", { length: 50 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  sentTo: varchar("sent_to", { length: 255 }).notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});

export const insertQuoteSubmissionSchema = createInsertSchema(quoteSubmissions).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  company: true,
  location: true,
  projectType: true,
  systemSpecs: true,
  estimatedBudget: true,
  message: true,
});

export const insertEmailTemplateSchema = createInsertSchema(emailTemplates).pick({
  templateType: true,
  subject: true,
  content: true,
  isActive: true,
});

export const insertInstallerReviewSchema = createInsertSchema(installerReviews).pick({
  installerId: true,
  clientName: true,
  rating: true,
  comment: true,
  projectType: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertInstaller = z.infer<typeof insertInstallerSchema>;
export type Installer = typeof installers.$inferSelect;
export type InsertInstallerReview = z.infer<typeof insertInstallerReviewSchema>;
export type InstallerReview = typeof installerReviews.$inferSelect;
export type InsertQuoteSubmission = z.infer<typeof insertQuoteSubmissionSchema>;
export type QuoteSubmission = typeof quoteSubmissions.$inferSelect;
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type EmailHistory = typeof emailHistory.$inferSelect;

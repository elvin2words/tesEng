import { users, contactSubmissions, projects, type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type Project, type InsertProject } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import type { InsertUser, User, InsertContactSubmission, ContactSubmission, InsertProject, Project, InsertInstaller, Installer, InsertInstallerReview, InstallerReview } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  getInstallers(): Promise<Installer[]>;
  getInstallerById(id: number): Promise<Installer | undefined>;
  createInstaller(installer: InsertInstaller): Promise<Installer>;
  getInstallerReviews(installerId: number): Promise<InstallerReview[]>;
  createInstallerReview(review: InsertInstallerReview): Promise<InstallerReview>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contactSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return contactSubmission;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async getInstallers(): Promise<Installer[]> {
    return await db.select().from(installers).where(eq(installers.isActive, true));
  }

  async getInstallerById(id: number): Promise<Installer | undefined> {
    const [installer] = await db.select().from(installers).where(eq(installers.id, id));
    return installer;
  }

  async createInstaller(installer: InsertInstaller): Promise<Installer> {
    const [newInstaller] = await db.insert(installers)
      .values(installer)
      .returning();
    return newInstaller;
  }

  async getInstallerReviews(installerId: number): Promise<InstallerReview[]> {
    return await db.select().from(installerReviews).where(eq(installerReviews.installerId, installerId));
  }

  async createInstallerReview(review: InsertInstallerReview): Promise<InstallerReview> {
    const [newReview] = await db.insert(installerReviews)
      .values(review)
      .returning();
    return newReview;
  }
}

export const storage = new DatabaseStorage();
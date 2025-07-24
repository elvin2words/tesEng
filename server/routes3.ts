import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertProjectSchema, insertInstallerSchema, insertInstallerReviewSchema, insertQuoteSubmissionSchema, insertEmailTemplateSchema } from "@shared/schema3";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json(submission);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact submission data" });
    }
  });

  // Get projects endpoint
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Create project endpoint
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  // Get installers endpoint
  app.get("/api/installers", async (req, res) => {
    try {
      const installers = await storage.getInstallers();
      res.json(installers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch installers" });
    }
  });

  // Get installer by ID endpoint
  app.get("/api/installers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const installer = await storage.getInstallerById(id);
      if (!installer) {
        return res.status(404).json({ error: "Installer not found" });
      }
      res.json(installer);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch installer" });
    }
  });

  // Create installer endpoint
  app.post("/api/installers", async (req, res) => {
    try {
      const validatedData = insertInstallerSchema.parse(req.body);
      const installer = await storage.createInstaller(validatedData);
      res.json(installer);
    } catch (error) {
      res.status(400).json({ error: "Invalid installer data" });
    }
  });

  // Get installer reviews endpoint
  app.get("/api/installers/:id/reviews", async (req, res) => {
    try {
      const installerId = parseInt(req.params.id);
      const reviews = await storage.getInstallerReviews(installerId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  // Create installer review endpoint
  app.post("/api/installers/:id/reviews", async (req, res) => {
    try {
      const installerId = parseInt(req.params.id);
      const validatedData = insertInstallerReviewSchema.parse({
        ...req.body,
        installerId
      });
      const review = await storage.createInstallerReview(validatedData);
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  // Quote submission endpoint
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSubmissionSchema.parse(req.body);
      const quote = await storage.createQuoteSubmission(validatedData);
      res.json(quote);
    } catch (error) {
      res.status(400).json({ error: "Invalid quote submission data" });
    }
  });

  // Get quotes endpoint (Admin)
  app.get("/api/admin/quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuoteSubmissions();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  });

  // Get quote by ID endpoint (Admin)
  app.get("/api/admin/quotes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const quote = await storage.getQuoteById(id);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      res.json(quote);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quote" });
    }
  });

  // Update quote status endpoint (Admin)
  app.patch("/api/admin/quotes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, assignedTo } = req.body;
      const updatedQuote = await storage.updateQuoteStatus(id, status, assignedTo);
      res.json(updatedQuote);
    } catch (error) {
      res.status(400).json({ error: "Failed to update quote" });
    }
  });

  // Get analytics endpoint (Admin)
  app.get("/api/admin/analytics", async (req, res) => {
    try {
      const analytics = await storage.getQuoteAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Email templates endpoints (Admin)
  app.get("/api/admin/email-templates", async (req, res) => {
    try {
      const templates = await storage.getEmailTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch email templates" });
    }
  });

  app.post("/api/admin/email-templates", async (req, res) => {
    try {
      const validatedData = insertEmailTemplateSchema.parse(req.body);
      const template = await storage.createEmailTemplate(validatedData);
      res.json(template);
    } catch (error) {
      res.status(400).json({ error: "Invalid email template data" });
    }
  });

  // Send follow-up email endpoint (Admin)
  app.post("/api/admin/quotes/:id/email", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { templateType } = req.body;
      const quote = await storage.getQuoteById(id);
      
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }

      const emailResult = await storage.sendAutoGeneratedEmail(quote, templateType);
      res.json(emailResult);
    } catch (error) {
      res.status(400).json({ error: "Failed to send email" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

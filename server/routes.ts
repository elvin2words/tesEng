import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertProjectSchema } from "@shared/schema";

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

  const httpServer = createServer(app);

  return httpServer;
}


// import type { Express } from "express";
// import { createServer, type Server } from "http";
// import { storage } from "./storage";
// import { insertContactSubmissionSchema, insertProjectSchema, insertInstallerSchema, insertInstallerReviewSchema } from "@shared/schema";

// export async function registerRoutes(app: Express): Promise<Server> {
//   // Contact submission endpoint
//   app.post("/api/contact", async (req, res) => {
//     try {
//       const validatedData = insertContactSubmissionSchema.parse(req.body);
//       const submission = await storage.createContactSubmission(validatedData);
//       res.json(submission);
//     } catch (error) {
//       res.status(400).json({ error: "Invalid contact submission data" });
//     }
//   });

//   // Get projects endpoint
//   app.get("/api/projects", async (req, res) => {
//     try {
//       const projects = await storage.getProjects();
//       res.json(projects);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch projects" });
//     }
//   });

//   // Create project endpoint
//   app.post("/api/projects", async (req, res) => {
//     try {
//       const validatedData = insertProjectSchema.parse(req.body);
//       const project = await storage.createProject(validatedData);
//       res.json(project);
//     } catch (error) {
//       res.status(400).json({ error: "Invalid project data" });
//     }
//   });

//   // Get installers endpoint
//   app.get("/api/installers", async (req, res) => {
//     try {
//       const installers = await storage.getInstallers();
//       res.json(installers);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch installers" });
//     }
//   });

//   // Get installer by ID endpoint
//   app.get("/api/installers/:id", async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       const installer = await storage.getInstallerById(id);
//       if (!installer) {
//         return res.status(404).json({ error: "Installer not found" });
//       }
//       res.json(installer);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch installer" });
//     }
//   });

//   // Create installer endpoint
//   app.post("/api/installers", async (req, res) => {
//     try {
//       const validatedData = insertInstallerSchema.parse(req.body);
//       const installer = await storage.createInstaller(validatedData);
//       res.json(installer);
//     } catch (error) {
//       res.status(400).json({ error: "Invalid installer data" });
//     }
//   });

//   // Get installer reviews endpoint
//   app.get("/api/installers/:id/reviews", async (req, res) => {
//     try {
//       const installerId = parseInt(req.params.id);
//       const reviews = await storage.getInstallerReviews(installerId);
//       res.json(reviews);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch reviews" });
//     }
//   });

//   // Create installer review endpoint
//   app.post("/api/installers/:id/reviews", async (req, res) => {
//     try {
//       const installerId = parseInt(req.params.id);
//       const validatedData = insertInstallerReviewSchema.parse({
//         ...req.body,
//         installerId
//       });
//       const review = await storage.createInstallerReview(validatedData);
//       res.json(review);
//     } catch (error) {
//       res.status(400).json({ error: "Invalid review data" });
//     }
//   });

//   const httpServer = createServer(app);

//   return httpServer;
// }

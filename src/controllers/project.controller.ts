// src/controllers/project.controller.ts
import { Request, Response } from 'express';
import prisma from '../services/prisma';

export const createProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const userId = (req as any).user.id;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        owner: {
          connect: { id: userId }, // 👈 userId should be an Int
        },
      },
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (!project || project.ownerId !== userId) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching project' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = (req as any).user.id;

  try {
    const project = await prisma.project.updateMany({
      where: { id: Number(id), ownerId: userId },
      data: { name },
    });

    if (!project.count) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const project = await prisma.project.deleteMany({
      where: { id: Number(id), ownerId: userId },
    });

    if (!project.count) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
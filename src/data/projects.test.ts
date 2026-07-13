import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { projectCategories, projectCategoryCounts, projects } from './projects';

const expectedProjectOrder = [
  'robot-dog',
  '6-dof-arm',
  'autonomous-cleaning-robot',
  'chess-bot',
  'pyblock-3d',
];

describe('project data', () => {
  it('keeps the selected projects in recruiter-first order', () => {
    expect(projects.map((project) => project.id)).toEqual(expectedProjectOrder);
    expect(new Set(projects.map((project) => project.id)).size).toBe(5);
    expect(
      projects.slice(0, 4).every((project) => project.category === 'hardware'),
    ).toBe(true);
    expect(
      projects.slice(4).every((project) => project.category === 'software'),
    ).toBe(true);
  });

  it('exposes stable category values and derived counts', () => {
    expect(projectCategories).toEqual(['all', 'hardware', 'software']);
    expect(projectCategoryCounts).toEqual({ all: 5, hardware: 4, software: 1 });

    const derivedCounts = projects.reduce(
      (counts, project) => ({
        ...counts,
        [project.category]: counts[project.category] + 1,
      }),
      { hardware: 0, software: 0 },
    );

    expect(projectCategoryCounts.all).toBe(projects.length);
    expect(projectCategoryCounts.hardware).toBe(derivedCounts.hardware);
    expect(projectCategoryCounts.software).toBe(derivedCounts.software);
  });

  it('provides complete, valid card content and links', () => {
    for (const project of projects) {
      expect(project.title.trim()).not.toBe('');
      expect(project.summary.trim()).not.toBe('');
      expect(project.contribution.trim()).not.toBe('');
      expect(project.tags.length).toBeGreaterThan(0);
      expect(new Set(project.tags).size).toBe(project.tags.length);
      expect(project.media.alt.trim()).not.toBe('');
      expect(project.media.width).toBeGreaterThan(0);
      expect(project.media.height).toBeGreaterThan(0);
      expect(project.media.src).toBe(`/images/projects/${project.id}.webp`);
      expect(project.links.length).toBeGreaterThan(0);

      for (const link of project.links) {
        const url = new URL(link.href);
        expect(url.protocol).toBe('https:');
        expect(link.label.trim()).not.toBe('');
      }
    }
  });

  it('references project media that exists in every required format', () => {
    for (const project of projects) {
      const imageBase = project.media.src.replace(/\.webp$/, '');
      const publicPath = imageBase.replace(/^\//, '');

      expect(
        existsSync(join(process.cwd(), 'public', `${publicPath}.webp`)),
      ).toBe(true);
      expect(
        existsSync(join(process.cwd(), 'public', `${publicPath}.avif`)),
      ).toBe(true);

      if (project.media.width > 640) {
        expect(
          existsSync(join(process.cwd(), 'public', `${publicPath}-640.webp`)),
        ).toBe(true);
        expect(
          existsSync(join(process.cwd(), 'public', `${publicPath}-640.avif`)),
        ).toBe(true);
      }
    }
  });

  it('uses the corrected Robot Dog repository', () => {
    const robotDog = projects.find((project) => project.id === 'robot-dog');

    expect(robotDog?.links[0].href).toBe(
      'https://github.com/MostafaH04/robot-dog',
    );
  });
});

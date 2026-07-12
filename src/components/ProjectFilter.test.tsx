import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { projectCategoryCounts, projects } from '../data/projects';
import ProjectFilter from './ProjectFilter';

const targetId = 'test-projects-grid';

function FilterFixture() {
  return (
    <>
      <ProjectFilter counts={projectCategoryCounts} targetId={targetId} />
      <div id={targetId}>
        {projects.map((project) => (
          <article
            key={project.id}
            data-testid={`project-${project.id}`}
            data-project-card
            data-category={project.category}
          >
            {project.title}
          </article>
        ))}
      </div>
    </>
  );
}

function visibleProjectIds() {
  return projects
    .filter(
      (project) =>
        !screen.getByTestId(`project-${project.id}`).hasAttribute('hidden'),
    )
    .map((project) => project.id);
}

function setUrl(url: string) {
  window.history.replaceState({}, '', url);
}

afterEach(() => {
  cleanup();
  setUrl('/projects');
});

describe('ProjectFilter', () => {
  it('starts with every SSR-provided card visible', async () => {
    setUrl('/projects');
    render(<FilterFixture />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
    });

    expect(visibleProjectIds()).toEqual(projects.map((project) => project.id));
    expect(screen.getByText('8 projects shown')).toHaveAttribute(
      'aria-live',
      'polite',
    );
  });

  it('hydrates its state from the category query parameter', async () => {
    setUrl('/projects?category=hardware');
    render(<FilterFixture />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Hardware' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
    });

    expect(visibleProjectIds()).toEqual(
      projects
        .filter((project) => project.category === 'hardware')
        .map(({ id }) => id),
    );
    expect(screen.getByText('4 projects shown')).toHaveAttribute(
      'aria-atomic',
      'true',
    );
  });

  it('filters cards and updates the shareable URL when a category is selected', async () => {
    setUrl('/projects');
    render(<FilterFixture />);

    fireEvent.click(screen.getByRole('button', { name: 'Software' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Software' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
    });

    expect(new URL(window.location.href).searchParams.get('category')).toBe(
      'software',
    );
    expect(visibleProjectIds()).toEqual(
      projects
        .filter((project) => project.category === 'software')
        .map(({ id }) => id),
    );
    expect(screen.getByText('4 projects shown')).toBeInTheDocument();
  });

  it('removes only the category parameter when All is selected', async () => {
    setUrl('/projects?ref=portfolio&category=hardware#projects-grid');
    render(<FilterFixture />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Hardware' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
    });

    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    const url = new URL(window.location.href);
    expect(url.searchParams.has('category')).toBe(false);
    expect(url.searchParams.get('ref')).toBe('portfolio');
    expect(url.hash).toBe('#projects-grid');
    expect(visibleProjectIds()).toEqual(projects.map((project) => project.id));
  });

  it('falls back to All for invalid values and follows browser history', async () => {
    setUrl('/projects?category=unknown');
    render(<FilterFixture />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
    });

    act(() => {
      window.history.pushState({}, '', '/projects?category=software');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Software' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
    });

    expect(visibleProjectIds()).toEqual(
      projects
        .filter((project) => project.category === 'software')
        .map(({ id }) => id),
    );
  });
});

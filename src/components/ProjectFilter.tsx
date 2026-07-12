import { useEffect, useState } from 'react';
import type {
  ProjectCategoryCounts,
  ProjectFilterCategory,
} from '../data/projects';
import '../styles/projects.css';

const categories: readonly ProjectFilterCategory[] = [
  'all',
  'hardware',
  'software',
];

const categoryLabels: Record<ProjectFilterCategory, string> = {
  all: 'All',
  hardware: 'Hardware',
  software: 'Software',
};

export interface ProjectFilterProps {
  counts: ProjectCategoryCounts;
  initialCategory?: ProjectFilterCategory;
  targetId?: string;
}

function parseCategory(value: string | null): ProjectFilterCategory {
  return categories.includes(value as ProjectFilterCategory)
    ? (value as ProjectFilterCategory)
    : 'all';
}

function applyProjectCategory(
  category: ProjectFilterCategory,
  targetId: string,
) {
  if (category === 'all') {
    delete document.documentElement.dataset.projectCategory;
  } else {
    document.documentElement.dataset.projectCategory = category;
  }

  const projectGrid = document.getElementById(targetId);
  if (!projectGrid) return;

  const cards = projectGrid.querySelectorAll<HTMLElement>(
    '[data-project-card]',
  );

  cards.forEach((card) => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
  });

  projectGrid.dataset.activeCategory = category;
}

export default function ProjectFilter({
  counts,
  initialCategory = 'all',
  targetId = 'projects-grid',
}: ProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectFilterCategory>(initialCategory);

  useEffect(() => {
    const syncCategoryFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryValue = params.get('category');
      const category =
        categoryValue === null ? initialCategory : parseCategory(categoryValue);

      applyProjectCategory(category, targetId);
      setSelectedCategory(category);
    };

    syncCategoryFromUrl();
    window.addEventListener('popstate', syncCategoryFromUrl);

    return () => window.removeEventListener('popstate', syncCategoryFromUrl);
  }, [initialCategory, targetId]);

  const selectCategory = (category: ProjectFilterCategory) => {
    applyProjectCategory(category, targetId);
    setSelectedCategory(category);

    const url = new URL(window.location.href);
    if (category === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }

    window.history.replaceState(window.history.state, '', url);
  };

  const visibleCount = counts[selectedCategory];
  const projectLabel = visibleCount === 1 ? 'project' : 'projects';

  return (
    <div className="project-filter">
      <div
        className="project-filter__controls"
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((category) => (
          <button
            key={category}
            className="project-filter__button"
            type="button"
            data-filter-category={category}
            aria-controls={targetId}
            aria-pressed={selectedCategory === category}
            onClick={() => selectCategory(category)}
          >
            <span>{categoryLabels[category]}</span>
            <span className="project-filter__button-count" aria-hidden="true">
              {counts[category]}
            </span>
          </button>
        ))}
      </div>

      <p
        className="project-filter__status"
        aria-live="polite"
        aria-atomic="true"
      >
        {visibleCount} {projectLabel} shown
      </p>
    </div>
  );
}

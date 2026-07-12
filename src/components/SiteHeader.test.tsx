import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import SiteHeader from './SiteHeader';

const themeStorageKey = 'portfolio-theme';

interface MatchMediaController {
  setMatches: (matches: boolean) => void;
}

function installMatchMedia(initialMatches: boolean): MatchMediaController {
  let matches = initialMatches;
  const listeners = new Set<EventListenerOrEventListenerObject>();

  const mediaQuery = {
    get matches() {
      return matches;
    },
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(
      (type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'change') listeners.add(listener);
      },
    ),
    removeEventListener: vi.fn(
      (type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'change') listeners.delete(listener);
      },
    ),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn(() => mediaQuery),
  });

  return {
    setMatches(nextMatches) {
      matches = nextMatches;
      const event = new Event('change') as MediaQueryListEvent;
      Object.defineProperties(event, {
        matches: { value: nextMatches },
        media: { value: mediaQuery.media },
      });

      for (const listener of listeners) {
        if (typeof listener === 'function') {
          listener.call(mediaQuery, event);
        } else {
          listener.handleEvent(event);
        }
      }
    },
  };
}

function installDialogMock() {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value: vi.fn(function showModal(this: HTMLDialogElement) {
      this.open = true;
    }),
  });

  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value: vi.fn(function close(this: HTMLDialogElement) {
      if (!this.open) return;
      this.open = false;
      this.dispatchEvent(new Event('close'));
    }),
  });
}

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
  document.body.removeAttribute('style');
  delete document.documentElement.dataset.theme;
  document.documentElement.style.colorScheme = '';
  document.head.innerHTML = '<meta name="theme-color" content="#000000">';

  installDialogMock();

  Object.defineProperty(window, 'requestAnimationFrame', {
    configurable: true,
    value: vi.fn((callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    }),
  });
  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    value: vi.fn(),
  });
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    value: 125,
  });
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: 1024,
  });
  Object.defineProperty(document.documentElement, 'clientWidth', {
    configurable: true,
    value: 1000,
  });
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.restoreAllMocks();
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal');
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'close');
});

describe('SiteHeader theme behavior', () => {
  it('gives a stored preference precedence over the system theme', async () => {
    const media = installMatchMedia(false);
    window.localStorage.setItem(themeStorageKey, 'dark');

    render(<SiteHeader currentPath="/" />);

    await waitFor(() =>
      expect(document.documentElement.dataset.theme).toBe('dark'),
    );
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      'content',
      '#07131f',
    );

    act(() => media.setMatches(false));
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('uses system changes while no explicit preference exists', async () => {
    const media = installMatchMedia(false);
    render(<SiteHeader currentPath="/" />);

    await waitFor(() =>
      expect(document.documentElement.dataset.theme).toBe('light'),
    );
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      'content',
      '#fff8e8',
    );

    act(() => media.setMatches(true));

    await waitFor(() =>
      expect(document.documentElement.dataset.theme).toBe('dark'),
    );
  });

  it('persists a manual choice and shields it from later system changes', async () => {
    const media = installMatchMedia(true);
    render(<SiteHeader currentPath="/" />);

    await waitFor(() =>
      expect(document.documentElement.dataset.theme).toBe('dark'),
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to light theme' }),
    );

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(window.localStorage.getItem(themeStorageKey)).toBe('light');
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      'content',
      '#fff8e8',
    );

    act(() => media.setMatches(true));
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('synchronizes cross-tab storage changes and falls back to the system', async () => {
    installMatchMedia(false);
    render(<SiteHeader currentPath="/" />);

    await waitFor(() =>
      expect(document.documentElement.dataset.theme).toBe('light'),
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: themeStorageKey,
          newValue: 'dark',
        }),
      );
    });
    expect(document.documentElement.dataset.theme).toBe('dark');

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: themeStorageKey,
          newValue: null,
        }),
      );
    });
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});

describe('SiteHeader mobile dialog', () => {
  it('locks scrolling, moves focus, and restores both when closed', async () => {
    installMatchMedia(true);
    render(<SiteHeader currentPath="/projects" />);

    const menuButton = screen.getByRole('button', { name: 'Menu' });
    menuButton.focus();
    fireEvent.click(menuButton);

    const dialog =
      document.querySelector<HTMLDialogElement>('#site-mobile-menu');
    expect(dialog).not.toBeNull();
    expect(dialog?.open).toBe(true);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.top).toBe('-125px');
    expect(document.body.style.paddingRight).toBe('24px');
    expect(
      screen.getByRole('button', { name: 'Close navigation menu' }),
    ).toHaveFocus();

    fireEvent.click(
      screen.getByRole('button', { name: 'Close navigation menu' }),
    );

    await waitFor(() =>
      expect(menuButton).toHaveAttribute('aria-expanded', 'false'),
    );
    expect(dialog?.open).toBe(false);
    expect(document.body.style.overflow).toBe('');
    expect(document.body.style.position).toBe('');
    expect(document.body.style.top).toBe('');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 125);
    expect(menuButton).toHaveFocus();
  });

  it('closes on native cancel and when the active path changes', async () => {
    installMatchMedia(true);
    const { rerender } = render(<SiteHeader currentPath="/projects" />);
    const menuButton = screen.getByRole('button', { name: 'Menu' });
    const dialog =
      document.querySelector<HTMLDialogElement>('#site-mobile-menu');

    fireEvent.click(menuButton);
    expect(dialog?.open).toBe(true);

    const cancelEvent = new Event('cancel', { cancelable: true });
    fireEvent(dialog as HTMLDialogElement, cancelEvent);
    expect(cancelEvent.defaultPrevented).toBe(true);
    expect(dialog?.open).toBe(false);

    fireEvent.click(menuButton);
    expect(dialog?.open).toBe(true);
    rerender(<SiteHeader currentPath="/about" />);

    await waitFor(() => expect(dialog?.open).toBe(false));
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});

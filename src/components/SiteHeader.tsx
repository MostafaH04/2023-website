import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';

import '../styles/header.css';

type Theme = 'dark' | 'light';

export interface SiteHeaderProps {
  currentPath: string;
}

interface ScrollLockSnapshot {
  scrollY: number;
  overflow: string;
  position: string;
  top: string;
  width: string;
  paddingRight: string;
}

const THEME_STORAGE_KEY = 'portfolio-theme';

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

function normalizePath(path: string) {
  const cleanPath = path.split(/[?#]/, 1)[0] || '/';

  if (cleanPath === '/') {
    return cleanPath;
  }

  return cleanPath.replace(/\/+$/, '');
}

function isCurrentPath(currentPath: string, href: string) {
  const current = normalizePath(currentPath);
  const destination = normalizePath(href);

  if (destination === '/') {
    return current === destination;
  }

  return current === destination || current.startsWith(`${destination}/`);
}

function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light';
}

function readStoredTheme() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  themeColor?.setAttribute('content', theme === 'dark' ? '#07131f' : '#fff8e8');

  const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  favicon?.setAttribute(
    'href',
    theme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg',
  );

  const touchIcon = document.querySelector<HTMLLinkElement>(
    'link[rel="apple-touch-icon"]',
  );
  touchIcon?.setAttribute(
    'href',
    theme === 'dark'
      ? '/apple-touch-icon-dark.png'
      : '/apple-touch-icon-light.png',
  );

  const manifest = document.querySelector<HTMLLinkElement>(
    'link[rel="manifest"]',
  );
  manifest?.setAttribute(
    'href',
    theme === 'dark'
      ? '/manifest-dark.webmanifest'
      : '/manifest-light.webmanifest',
  );
}

function persistTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme selection still works when storage is unavailable.
  }
}

function BrandMark() {
  return (
    <a className="site-brand" href="/" aria-label="Mostafa Hussein, home">
      <span className="site-brand__mark" aria-hidden="true">
        <span className="site-brand__latin">M</span>
      </span>
      <span className="site-brand__name">
        <span>Mostafa</span>
        <span>Hussein</span>
      </span>
    </a>
  );
}

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

function ThemeToggle({ theme, onToggle, className = '' }: ThemeToggleProps) {
  const actionLabel =
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      className={`site-theme-toggle ${className}`.trim()}
      type="button"
      data-theme={theme}
      aria-label={actionLabel}
      onClick={onToggle}
    >
      <span className="site-theme-toggle__track" aria-hidden="true">
        <span className="site-theme-toggle__thumb" />
      </span>
    </button>
  );
}

function NavigationLinks({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="site-navigation__list">
      {navigationItems.map((item) => {
        const current = item.href.includes('#')
          ? false
          : isCurrentPath(currentPath, item.href);

        return (
          <li key={item.href}>
            <a
              className="site-navigation__link"
              href={item.href}
              aria-current={current ? 'page' : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function SiteHeader({ currentPath }: SiteHeaderProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const scrollLockRef = useRef<ScrollLockSnapshot | null>(null);

  useEffect(() => {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const syncTheme = (nextTheme: Theme) => {
      setTheme(nextTheme);
      applyTheme(nextTheme);
    };

    syncTheme(readStoredTheme() ?? getSystemTheme());

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (!readStoredTheme()) {
        syncTheme(event.matches ? 'dark' : 'light');
      }
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }

      syncTheme(isTheme(event.newValue) ? event.newValue : getSystemTheme());
    };

    colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      colorSchemeQuery.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      persistTheme(nextTheme);
      return nextTheme;
    });
  };

  const lockPageScroll = () => {
    if (scrollLockRef.current) {
      return;
    }

    const body = document.body;
    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const computedPadding =
      Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    scrollLockRef.current = {
      scrollY,
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${computedPadding + scrollbarWidth}px`;
    }
  };

  const unlockPageScroll = () => {
    const snapshot = scrollLockRef.current;

    if (!snapshot) {
      return;
    }

    const body = document.body;
    body.style.overflow = snapshot.overflow;
    body.style.position = snapshot.position;
    body.style.top = snapshot.top;
    body.style.width = snapshot.width;
    body.style.paddingRight = snapshot.paddingRight;
    scrollLockRef.current = null;
    window.scrollTo(0, snapshot.scrollY);
  };

  const openMenu = () => {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : menuButtonRef.current;

    lockPageScroll();

    try {
      dialog.showModal();
    } catch {
      unlockPageScroll();
      return;
    }

    setMenuOpen(true);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
  };

  const closeMenu = () => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
      return;
    }

    setMenuOpen(false);
    unlockPageScroll();
  };

  const handleDialogClose = () => {
    setMenuOpen(false);
    unlockPageScroll();

    const returnFocusTarget = returnFocusRef.current;
    returnFocusRef.current = null;
    window.requestAnimationFrame(() => returnFocusTarget?.focus());
  };

  const handleDialogBackdropClick = (
    event: ReactMouseEvent<HTMLDialogElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (dialogRef.current?.open) {
      closeMenu();
    }
    // Closing on path changes prevents stale modal state after client-side navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  useEffect(
    () => () => {
      if (dialogRef.current?.open) {
        dialogRef.current.close();
      }
      unlockPageScroll();
      // The scroll snapshot is stored in a ref and intentionally restored on unmount.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [],
  );

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <BrandMark />

        <div className="site-header__desktop-controls">
          <nav className="site-navigation" aria-label="Primary navigation">
            <NavigationLinks currentPath={currentPath} />
          </nav>
          <ThemeToggle
            theme={theme}
            onToggle={toggleTheme}
            className="site-header__desktop-theme"
          />
        </div>

        <button
          ref={menuButtonRef}
          className="site-header__menu-button"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls="site-mobile-menu"
          onClick={openMenu}
        >
          <span className="site-header__menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>Menu</span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="site-menu-dialog"
        id="site-mobile-menu"
        aria-labelledby="site-mobile-menu-title"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={handleDialogClose}
        onClick={handleDialogBackdropClick}
      >
        <div className="site-menu-dialog__topbar">
          <span className="site-menu-dialog__brand" aria-hidden="true">
            M
          </span>
          <button
            ref={closeButtonRef}
            className="site-menu-dialog__close"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <span aria-hidden="true" />
          </button>
        </div>

        <div className="site-menu-dialog__content">
          <h2 className="site-menu-dialog__title" id="site-mobile-menu-title">
            Navigate
          </h2>
          <nav
            className="site-menu-dialog__navigation"
            aria-label="Mobile navigation"
          >
            <NavigationLinks currentPath={currentPath} onNavigate={closeMenu} />
          </nav>
        </div>

        <div className="site-menu-dialog__footer">
          <span>Appearance</span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </dialog>
    </header>
  );
}

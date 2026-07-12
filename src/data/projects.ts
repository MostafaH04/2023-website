import { z } from 'zod';

export const projectCategories = ['all', 'hardware', 'software'] as const;

export type ProjectFilterCategory = (typeof projectCategories)[number];
export type ProjectCategory = Exclude<ProjectFilterCategory, 'all'>;
export type ProjectStatus =
  'Ongoing' | 'Completed' | 'Live' | 'Hackathon' | 'Experiment';
export type ProjectLinkKind = 'demo' | 'source' | 'writeup';

export interface ProjectImage {
  readonly src: `/images/projects/${string}.webp`;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
  readonly kind: ProjectLinkKind;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly summary: string;
  readonly contribution: string;
  readonly tags: readonly string[];
  readonly media: ProjectImage;
  readonly links: readonly [ProjectLink, ...ProjectLink[]];
}

const projectMediaPathSchema = z
  .string()
  .regex(/^\/images\/projects\/[a-z0-9-]+\.webp$/)
  .transform((path) => path as ProjectImage['src']);

const projectImageSchema = z.object({
  src: projectMediaPathSchema,
  alt: z.string().min(12),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const projectLinkSchema = z.object({
  label: z.string().min(1),
  href: z.url(),
  kind: z.enum(['demo', 'source', 'writeup']),
});

export const projectSchema: z.ZodType<Project> = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  category: z.enum(['hardware', 'software']),
  status: z.enum(['Ongoing', 'Completed', 'Live', 'Hackathon', 'Experiment']),
  summary: z.string().min(40),
  contribution: z.string().min(40),
  tags: z.array(z.string().min(1)).min(1),
  media: projectImageSchema,
  links: z.tuple([projectLinkSchema], projectLinkSchema),
});

/** Recruiter-first order: complete robotics systems lead, then software breadth. */
const projectEntries = [
  {
    id: 'robot-dog',
    title: 'Robot Dog',
    category: 'hardware',
    status: 'Ongoing',
    summary:
      'A custom quadruped platform for autonomous indoor navigation, built across mechanical design, embedded control, simulation, and ROS2.',
    contribution:
      'Developed ROS2 and PyBullet simulation foundations, inverse kinematics, gait control, and interfaces that mirror the physical robot.',
    tags: ['ROS2', 'STM32', 'PyBullet'],
    media: {
      src: '/images/projects/robot-dog.webp',
      alt: 'Custom four-legged Robot Dog prototype on a workshop floor',
      width: 990,
      height: 800,
    },
    links: [
      {
        label: 'Source',
        href: 'https://github.com/MostafaH04/robot-dog',
        kind: 'source',
      },
    ],
  },
  {
    id: '6-dof-arm',
    title: '6-DOFenshmirtz Arm',
    category: 'hardware',
    status: 'Completed',
    summary:
      'A six-axis desktop robot arm designed around custom gearing, coordinated stepper control, and an integrated controller board.',
    contribution:
      'Designed the mechanical system, kinematics, multi-axis motion library, and a four-layer PCB for six TMC2209-driven joints.',
    tags: ['Kinematics', 'Motion Control', 'PCB Design'],
    media: {
      src: '/images/projects/6-dof-arm.webp',
      alt: 'CAD rendering of the six-axis 6-DOFenshmirtz robot arm',
      width: 587,
      height: 708,
    },
    links: [
      {
        label: 'Project wiki',
        href: 'https://github.com/MostafaH04/6-DOF-ARM/wiki',
        kind: 'writeup',
      },
    ],
  },
  {
    id: 'autonomous-cleaning-robot',
    title: 'Autonomous Cleaning Robot',
    category: 'hardware',
    status: 'Ongoing',
    summary:
      'A modular mobile robot for exploring localization, visual SLAM, sensor fusion, and practical autonomy from the chassis upward.',
    contribution:
      'Built STM32 motor and dual-IMU interfaces, filtering and state-estimation foundations, plus a ROS2 architecture spanning Raspberry Pi and desktop.',
    tags: ['FreeRTOS', 'Sensor Fusion', 'ROS2'],
    media: {
      src: '/images/projects/autonomous-cleaning-robot.webp',
      alt: 'Electronics and chassis of the autonomous cleaning robot prototype',
      width: 680,
      height: 604,
    },
    links: [
      {
        label: 'Project wiki',
        href: 'https://github.com/MostafaH04/Autonomous-Cleaning-Robot/wiki',
        kind: 'writeup',
      },
    ],
  },
  {
    id: 'chess-bot',
    title: 'Chess Bot',
    category: 'hardware',
    status: 'Completed',
    summary:
      'An autonomous chess-playing robot that senses a physical board, plans with Stockfish, and executes moves through an XY gantry.',
    contribution:
      'Combined OpenCV board-state detection, custom controller communication, calibration sensors, and mechanical motion accurate to the chess squares.',
    tags: ['OpenCV', 'Stockfish', 'Mechanisms'],
    media: {
      src: '/images/projects/chess-bot.webp',
      alt: 'Physical autonomous Chess Bot beside its chess board',
      width: 679,
      height: 556,
    },
    links: [
      {
        label: 'Project wiki',
        href: 'https://github.com/MostafaH04/Chess-Bot/wiki',
        kind: 'writeup',
      },
    ],
  },
  {
    id: 'guber',
    title: 'Guber',
    category: 'software',
    status: 'Live',
    summary:
      'A community web app that helps people report local litter, organize cleanups, and discover volunteering opportunities.',
    contribution:
      'Built the responsive React and Firebase experience around an approachable reporting flow and community-focused interface.',
    tags: ['React', 'Firebase', 'Community UX'],
    media: {
      src: '/images/projects/guber.webp',
      alt: 'Guber community cleanup web application reporting screen',
      width: 375,
      height: 632,
    },
    links: [
      { label: 'Live demo', href: 'https://guber.pages.dev/', kind: 'demo' },
    ],
  },
  {
    id: 'magic-mouse',
    title: 'Magic Mouse',
    category: 'software',
    status: 'Hackathon',
    summary:
      'A webcam-driven hand-tracking experiment that turns natural hand movement into desktop pointer control.',
    contribution:
      'Connected computer-vision hand detection with Python input automation and built a clear demo experience for Hack the North.',
    tags: ['Computer Vision', 'Python', 'Interaction'],
    media: {
      src: '/images/projects/magic-mouse.webp',
      alt: 'Magic Mouse hand-tracking project wordmark and gesture illustration',
      width: 1200,
      height: 338,
    },
    links: [
      {
        label: 'Live demo',
        href: 'https://magic-mouse.netlify.app/',
        kind: 'demo',
      },
      {
        label: 'Source',
        href: 'https://github.com/MostafaH04/MagicMouse-HTN2020',
        kind: 'source',
      },
    ],
  },
  {
    id: 'work-flow',
    title: 'Work Flow',
    category: 'software',
    status: 'Hackathon',
    summary:
      'A productivity experiment that turns computer activity into a clearer view of focus, habits, and time usage.',
    contribution:
      'Helped shape and build the JAMHacks V prototype around concise analytics and a low-friction review workflow.',
    tags: ['Analytics', 'Productivity', 'Hackathon'],
    media: {
      src: '/images/projects/work-flow.webp',
      alt: 'Work Flow productivity analytics dashboard',
      width: 301,
      height: 332,
    },
    links: [
      {
        label: 'Devpost',
        href: 'https://devpost.com/software/time-flow',
        kind: 'writeup',
      },
    ],
  },
  {
    id: 'pyblock-3d',
    title: 'PyBlock-3D',
    category: 'software',
    status: 'Experiment',
    summary:
      'A Python and Pygame rendering experiment that projects a block-based 3D world onto a two-dimensional display.',
    contribution:
      'Implemented perspective projection, camera-space mapping, player movement, and memory-aware world loading from first principles.',
    tags: ['Python', 'Pygame', 'Rendering'],
    media: {
      src: '/images/projects/pyblock-3d.webp',
      alt: 'PyBlock-3D block-based world rendered in Pygame',
      width: 1193,
      height: 672,
    },
    links: [
      {
        label: 'Project wiki',
        href: 'https://github.com/MostafaH04/PyBlock-3D/wiki',
        kind: 'writeup',
      },
    ],
  },
] as const satisfies readonly Project[];

const projectCollectionSchema = z
  .array(projectSchema)
  .length(8)
  .superRefine((entries, context) => {
    const ids = new Set<string>();

    entries.forEach((entry, index) => {
      if (ids.has(entry.id)) {
        context.addIssue({
          code: 'custom',
          message: `Duplicate project id: ${entry.id}`,
          path: [index, 'id'],
        });
      }
      ids.add(entry.id);
    });
  });

export const projects: readonly Project[] = Object.freeze(
  projectCollectionSchema.parse(projectEntries),
);

export type ProjectId = (typeof projectEntries)[number]['id'];
export type ProjectCategoryCounts = Readonly<
  Record<ProjectFilterCategory, number>
>;

export const projectCategoryCounts: ProjectCategoryCounts = Object.freeze(
  projects.reduce<Record<ProjectFilterCategory, number>>(
    (counts, project) => {
      counts.all += 1;
      counts[project.category] += 1;
      return counts;
    },
    { all: 0, hardware: 0, software: 0 },
  ),
);

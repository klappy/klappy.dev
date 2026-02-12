/**
 * Content Filtering Utilities
 *
 * Filters manifest resources for human-facing display.
 * Documents are filtered by audience, exposure, and path patterns
 * to ensure visitors see curated public content rather than
 * agent system prompts, templates, or internal scaffolding.
 */

/**
 * Hardcoded human entry points.
 * These are the recommended reading order for someone new to ODD.
 * This is intentionally hardcoded until the canon repo adds
 * a proper start_here mechanism for human audiences.
 */
export const HUMAN_START_HERE = [
  {
    path: '/odd/README.md',
    label: 'What is ODD?',
    description: 'Start here. The public explanation of Outcomes-Driven Development.'
  },
  {
    path: '/canon/values/axioms.md',
    label: 'Foundational Axioms',
    description: 'The four values everything derives from.'
  },
  {
    path: '/odd/manifesto.md',
    label: 'The Manifesto',
    description: 'Why this approach exists.'
  },
  {
    path: '/canon/constraints/definition-of-done.md',
    label: 'Definition of Done',
    description: 'When can work honestly be called done?'
  },
  {
    path: '/canon/constraints/README.md',
    label: 'Constraints',
    description: 'What must be true for this work to make sense?'
  }
];

/**
 * Folder labels for primary navigation.
 * Maps path prefixes to human-readable names.
 */
export const FOLDER_LABELS = {
  '/odd': 'ODD (Philosophy & Principles)',
  '/canon/values': 'Values & Axioms',
  '/canon/constraints': 'Constraints & Rules',
  '/canon/methods': 'Methods',
  '/canon/principles': 'Principles',
  '/canon/apocrypha': 'Apocrypha',
  '/canon/resonance': 'Resonance (External Works)',
  '/canon/decisions': 'Decisions',
  '/canon/definitions': 'Definitions',
  '/canon/defaults': 'Defaults',
  '/canon/diagnostics': 'Diagnostics',
  '/canon/meta': 'Canon Meta',
  '/odd/appendices': 'Appendices',
  '/odd/getting-started': 'Getting Started',
  '/odd/decisions': 'ODD Decisions',
  '/about': 'About',
  '/projects': 'Projects',
};

/**
 * Returns true if a resource should appear in the default browsing view.
 * Excludes agent-only content, internal scaffolding, templates,
 * compiled outputs, and hidden documents.
 */
export function isPublicFacing(resource) {
  const audience = resource.audience;
  const exposure = resource.exposure;
  const path = resource.path;

  // Exclude agent-only and internal docs
  if (audience === 'agents') return false;
  if (audience === 'internal') return false;
  if (audience === 'system') return false;
  if (audience === 'docs') return false;
  if (exposure === 'hidden') return false;
  if (exposure === 'internal') return false;

  // Exclude by path pattern
  if (path.startsWith('/docs/agents/')) return false;
  if (path.startsWith('/docs/infra/')) return false;
  if (path.startsWith('/docs/migrations/')) return false;
  if (path.startsWith('/docs/guiding-artifacts/')) return false;
  if (path.includes('_compiled/')) return false;
  if (path.includes('TEMPLATE')) return false;

  return true;
}

/**
 * Returns true if a resource should render with the aged archival paper stock.
 * Apocrypha content gets a distinct visual treatment.
 */
export function isApocrypha(resource) {
  if (resource.audience === 'apocrypha') return true;
  if (resource.path.includes('apocrypha/')) return true;

  const tags = resource.tags || [];
  const apocTags = ['fragment', 'reconstruction', 'predocumentary', 'system-voice'];
  return tags.some(t => apocTags.includes(t));
}

/**
 * Groups resources by their folder path.
 * Returns an object mapping folder paths to arrays of resources.
 */
export function groupByFolder(resources) {
  const folders = {};
  resources.forEach(resource => {
    const parts = resource.path.split('/').filter(Boolean);
    if (parts.length >= 2) {
      const folder = '/' + parts.slice(0, parts.length - 1).join('/');
      if (!folders[folder]) folders[folder] = [];
      folders[folder].push(resource);
    }
  });
  return folders;
}

/**
 * Collapses deep folder paths into navigable top-level groups.
 * Merges sub-subfolders into their parent canonical folder.
 */
export function getNavigableFolders(resources) {
  const publicResources = resources.filter(isPublicFacing);
  const rawFolders = groupByFolder(publicResources);

  // Merge into canonical navigation groups
  const groups = {};

  Object.entries(rawFolders).forEach(([folder, docs]) => {
    // Find the best matching label key
    let matchKey = null;
    let matchLen = 0;
    Object.keys(FOLDER_LABELS).forEach(key => {
      if (folder.startsWith(key) && key.length > matchLen) {
        matchKey = key;
        matchLen = key.length;
      }
    });

    const groupKey = matchKey || folder;
    if (!groups[groupKey]) {
      groups[groupKey] = {
        key: groupKey,
        label: FOLDER_LABELS[groupKey] || groupKey.split('/').filter(Boolean).pop(),
        docs: [],
      };
    }
    groups[groupKey].docs.push(...docs);
  });

  // Sort docs within each group by tier then title
  Object.values(groups).forEach(group => {
    group.docs.sort((a, b) => {
      const tierA = a.tier != null ? a.tier : 3;
      const tierB = b.tier != null ? b.tier : 3;
      if (tierA !== tierB) return tierA - tierB;
      return a.title.localeCompare(b.title);
    });
  });

  return groups;
}

/**
 * Returns the effective tier for display purposes.
 * Documents without a tier field default to tier 3.
 */
export function effectiveTier(resource) {
  return resource.tier != null ? resource.tier : 3;
}

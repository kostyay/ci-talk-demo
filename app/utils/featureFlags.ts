// Feature flags configuration
export type FeatureFlag = {
  name: string;
  description: string;
  enabled: boolean;
};

export type FeatureFlags = {
  [key: string]: FeatureFlag;
};

// Define our feature flags
export const featureFlags: FeatureFlags = {
  DARK_MODE: {
    name: "Dark Mode",
    description: "Enable dark mode throughout the application",
    enabled: true,
  },
  ADVANCED_TODO_FILTERS: {
    name: "Advanced Todo Filters",
    description: "Enable filtering todos by status, date, and priority",
    enabled: false,
  },
  TODO_CATEGORIES: {
    name: "Todo Categories",
    description: "Allow users to categorize todos",
    enabled: true,
  },
  EXPORT_TODOS: {
    name: "Export Todos",
    description: "Allow users to export todos as CSV or JSON",
    enabled: true,
  },
  ANIMATED_COW: {
    name: "Animated Cow",
    description: "Show an animated cow instead of static cowsay",
    enabled: false,
  },
};

/**
 * Check if a feature flag is enabled
 * @param flagKey The key of the feature flag to check
 * @returns boolean indicating if the feature is enabled
 */
export function isFeatureEnabled(flagKey: string): boolean {
  const flag = featureFlags[flagKey];

  // If flag doesn't exist or is explicitly disabled, return false
  if (!flag || !flag.enabled) {
    return false;
  }

  return true;
}
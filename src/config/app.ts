// Base configuration type
export type BaseAppConfig = {
  name: string;
  description: string;
  theme: string;
  images: {
    logo: string;
    favicon: string;
    hero: string;
    placeholders: {
      post: string;
      profile: string;
    };
    icons: Record<string, string>;
  };
};

// Default base configuration
export const APP_CONFIG: BaseAppConfig = {
  name: "Website Base",
  description: "App Description",
  theme: "default",
  images: {
    logo: "/images/logo.svg",
    favicon: "/images/favicon.ico",
    hero: "/images/hero.jpg",
    placeholders: {
      post: "/images/placeholder-post.jpg",
      profile: "/images/placeholder-profile.jpg",
    },
    icons: {}
  }
} as const;
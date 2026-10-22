// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://monban.miyu.pw',
  integrations: [
    starlight({
      title: 'monban',
      description: 'Minecraft access-control documentation for standalone servers and Velocity networks.',
      logo: {
        src: './src/assets/logo.png',
        alt: 'monban',
        replacesTitle: false,
      },
      favicon: '/favicon.png',
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/hanamuramiyu/monban',
        },
      ],
      components: {
        ThemeProvider: './src/components/DarkThemeProvider.astro',
        ThemeSelect: './src/components/Empty.astro',
        LanguageSelect: './src/components/Empty.astro',
      },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Introduction', link: '/' },
            { label: 'How monban Works', slug: 'concepts/how-it-works' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Choosing a Platform', slug: 'getting-started/choosing-a-platform' },
            { label: 'Upgrading to 3.3', slug: 'getting-started/upgrading-to-3-3' },
          ],
        },
        {
          label: 'Set Up',
          items: [
            { label: 'Standalone', slug: 'standalone/setup' },
            { label: 'Velocity Network', slug: 'velocity/setup' },
            { label: 'Geyser & Floodgate', slug: 'velocity/geyser-floodgate' },
          ],
        },
        {
          label: 'Administration',
          items: [
            { label: 'Command Overview', slug: 'administration/commands' },
            { label: 'Whitelist', slug: 'administration/whitelist' },
            { label: 'Scoped Access', slug: 'velocity/scoped-access' },
            { label: 'Player Groups & Permissions', slug: 'concepts/player-groups' },
            { label: 'Lookup', slug: 'administration/lookup' },
            { label: 'Status', slug: 'administration/status' },
          ],
        },
        {
          label: 'Understand',
          items: [
            { label: 'Player Identity', slug: 'concepts/player-identity' },
            { label: 'Access Model', slug: 'concepts/access-model' },
            { label: 'Security Model', slug: 'concepts/security-model' },
            { label: 'Backend Synchronization', slug: 'concepts/backend-sync' },
            { label: 'Server Groups', slug: 'velocity/server-groups' },
            { label: 'Backend Policies', slug: 'velocity/backend-policies' },
            { label: 'Hybrid Authentication', slug: 'velocity/hybrid-authentication' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Standalone Online Server', slug: 'guides/standalone-online' },
            { label: 'Standalone Offline Server', slug: 'guides/standalone-offline' },
            { label: 'Basic Velocity Network', slug: 'guides/basic-velocity-network' },
            { label: 'Restrict a Backend', slug: 'guides/restrict-a-backend' },
            { label: 'Centralized Permissions', slug: 'guides/centralized-permissions' },
            { label: 'Hybrid Network', slug: 'guides/hybrid-network' },
          ],
          collapsed: true,
        },
        {
          label: 'Reference',
          items: [
            { label: 'config.yml', slug: 'reference/config' },
            { label: 'Commands & Permissions', slug: 'reference/commands' },
            { label: 'whitelist.yml', slug: 'reference/whitelist' },
            { label: 'server-groups.yml', slug: 'reference/server-groups' },
            { label: 'access-grants.yml', slug: 'reference/access-grants' },
            { label: 'backend-access.yml', slug: 'reference/backend-access' },
            { label: 'player-groups.yml', slug: 'reference/player-groups' },
            { label: 'group-assignments.yml', slug: 'reference/group-assignments' },
            { label: 'player-permissions.yml', slug: 'reference/player-permissions' },
            { label: 'backend.yml', slug: 'reference/backend' },
            { label: 'sync.yml', slug: 'reference/sync' },
          ],
          collapsed: true,
        },
        {
          label: 'Help',
          items: [
            { label: 'Troubleshooting', slug: 'help/troubleshooting' },
            { label: 'FAQ', slug: 'help/faq' },
          ],
          collapsed: true,
        },
      ],
    }),
  ],
});

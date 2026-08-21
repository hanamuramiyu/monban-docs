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
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Choosing a Platform', slug: 'getting-started/choosing-a-platform' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Player Identity', slug: 'concepts/player-identity' },
            { label: 'Access Model', slug: 'concepts/access-model' },
          ],
        },
        {
          label: 'Standalone',
          items: [
            { label: 'Setup', slug: 'standalone/setup' },
          ],
        },
        {
          label: 'Velocity',
          items: [
            { label: 'Setup', slug: 'velocity/setup' },
            { label: 'Server Groups', slug: 'velocity/server-groups' },
            { label: 'Scoped Access', slug: 'velocity/scoped-access' },
            { label: 'Backend Policies', slug: 'velocity/backend-policies' },
            { label: 'Hybrid Authentication', slug: 'velocity/hybrid-authentication' },
          ],
        },
        {
          label: 'Administration',
          items: [
            { label: 'Whitelist', slug: 'administration/whitelist' },
            { label: 'Lookup', slug: 'administration/lookup' },
            { label: 'Access', slug: 'administration/access' },
            { label: 'Status', slug: 'administration/status' },
            { label: 'Permissions', slug: 'administration/permissions' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'config.yml', slug: 'reference/config' },
            { label: 'whitelist.yml', slug: 'reference/whitelist' },
            { label: 'server-groups.yml', slug: 'reference/server-groups' },
            { label: 'access-grants.yml', slug: 'reference/access-grants' },
            { label: 'backend-access.yml', slug: 'reference/backend-access' },
          ],
          collapsed: true,
        },
        {
          label: 'Guides',
          items: [
            { label: 'Standalone Online Server', slug: 'guides/standalone-online' },
            { label: 'Standalone Offline Server', slug: 'guides/standalone-offline' },
            { label: 'Basic Velocity Network', slug: 'guides/basic-velocity-network' },
            { label: 'Restrict a Backend', slug: 'guides/restrict-a-backend' },
            { label: 'Hybrid Premium + Offline Network', slug: 'guides/hybrid-network' },
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

/**
 * Site-wide settings. Edit this file to change the company details or the
 * navigation menu — every page picks these values up automatically.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const site = {
  name: 'Cebra Partners',
  description:
    'Cebra Partners is focused on acquiring, operating, and growing privately-owned businesses in Kansas and Missouri.',
  email: 'casey@cebrapartners.com',
  contactSubject: 'Inquiring re: Cebra Partners',
  locale: 'en_US',
  areaServed: ['Kansas', 'Missouri'],

  /** Top navigation. Add a new page to `src/pages/` and list it here to show it in the menu. */
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
  ] satisfies NavItem[],
};

/** `mailto:` link used by every "Contact Us" button. */
export const contactHref = `mailto:${site.email}?subject=${encodeURIComponent(site.contactSubject)}`;

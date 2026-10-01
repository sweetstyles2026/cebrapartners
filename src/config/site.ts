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

  /**
   * Header menu links (shown on tablet and desktop). Links can point to a section on the home page
   * (`/#about`) or to another page in `src/pages/` (e.g. `/portfolio/`).
   */
  nav: [
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ] satisfies NavItem[],
};

/** `mailto:` link used by every "Contact Us" button. */
export const contactHref = `mailto:${site.email}?subject=${encodeURIComponent(site.contactSubject)}`;

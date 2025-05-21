export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export type NavItem = {
  id: string;
  label: string;
  href: string;
};
export interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<INavItem>;
  href?: string;
  id: string;
  currentPageNavigation?: string | undefined;
}

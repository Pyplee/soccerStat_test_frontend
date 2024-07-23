export default function getColorActivePage(
  currentPage: string,
  activePage: string,
) {
  const colorsBadge = {
    active: "green",
    inActive: "white",
  };

  return currentPage === activePage ? colorsBadge.active : colorsBadge.inActive;
}

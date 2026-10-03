export function formatDate(dateString: string): string {
  try {
    const [year, month] = dateString.split("-");
    if (!year || !month) return dateString;
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return dateString;
  }
}

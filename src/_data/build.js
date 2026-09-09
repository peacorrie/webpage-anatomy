export default function () {
  const now = new Date();
  return {
    date: now.toISOString(),
    formatted: now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  };
}

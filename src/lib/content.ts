import { getCollection } from "astro:content";

export async function getPosts({ includeDrafts = false } = {}) {
  const posts = await getCollection("blog", ({ data }) => includeDrafts || !data.draft);

  return posts.toSorted(
    (a, b) =>
      b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || a.id.localeCompare(b.id),
  );
}

export async function getCaseStudies() {
  const studies = await getCollection("work");

  return studies.toSorted(
    (a, b) =>
      b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || a.id.localeCompare(b.id),
  );
}

function entryURL(section: "blog" | "work", id: string) {
  return `/${section}/${id.split("/").map(encodeURIComponent).join("/")}/`;
}

export function postURL(id: string) {
  return entryURL("blog", id);
}

export function caseStudyURL(id: string) {
  return entryURL("work", id);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

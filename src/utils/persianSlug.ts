export const nameToPersianSlug = (name: string) => {
  return name
    .replace(/\u200C/gm, " ")
    .replace(/\(|\)/g, " ")
    .trim()
    .split(" ")
    .join("-");
};

export const persianSlugToName = (slug: string) => {
  return slug.split("-").join(" ");
};

import _ from "lodash";

// Storing tags in local storage since no back-end

// Creating new tags functionality has not been implemented yet, so that tags are static
export const TagsList = [
  "Tag 1",
  "Tag 2",
  "Tag 3",
  "Tag 4",
  "Tag 5",
  "Tag 6",
  "Tag 7",
  "Tag 8",
  "Tag 9",
  "Tag 10",
  "Tag 11",
  "Tag 12",
  "Tag 13",
  "Tag 14",
  "Tag 15",
];

export function getReportsTags() {
  return JSON.parse(localStorage.getItem("reportsTags") || "{}");
}

export function getReportTags(id: number) {
  let all_tags = getReportsTags();
  return all_tags[id] || [];
}

export function saveReportTags(id: number, tags: any[]) {
  let all_tags = getReportsTags();
  all_tags[id] = tags;
  localStorage.setItem("reportsTags", JSON.stringify(all_tags));
}

export function getUnusedTags(id: number) {
  let tags = getReportTags(id);
  return _.filter(
    TagsList,
    (tag) => !_.some(tags, (reportTag) => reportTag.text === tag)
  );
}

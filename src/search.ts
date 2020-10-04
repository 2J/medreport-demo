import _ from "lodash";
import axios from "axios";
import { getReportsTags } from "./tags";

// Normally, the filtering would be done on the back-end and only the filtered result would be sent to the front-end.
// However, since there is no back-end in this demo, all reports will be loaded and filtered on the front-end.

export async function openReports() {
  return axios.get("/reports.json").then((res) => {
    let reports = res.data;
    return reports;
  });
}

export async function searchReportsByText(text: string) {
  let search_text = _.lowerCase(_.trim(text));

  let reports = await openReports();

  let filtered_reports = _.filter(reports, (report) => {
    return (
      _.includes(_.lowerCase(report.id), search_text) ||
      _.includes(_.lowerCase(report.name), search_text) ||
      _.includes(_.lowerCase(report.text).replace(/\n/, ""), search_text)
    );
  });

  return filtered_reports;
}

export async function searchReportsById(id: number) {
  let reports = await openReports();

  let filtered_reports = _.find(reports, { id: id });

  return filtered_reports;
}

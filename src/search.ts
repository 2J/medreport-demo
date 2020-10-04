import _ from "lodash";
import axios from "axios";

// Normally, the filtering would be done on the back-end and only the filtered result would be sent to the front-end.
// However, since there is no back-end in this demo, all reports will be loaded and filtered on the front-end.

export async function openReports() {
  return axios.get("/reports.json").then((res) => {
    let reports = res.data;
    return reports;
  });
}

export async function searchReportsByText(text: string) {
  let search_text = _.trim(text);

  let reports = await openReports();

  let filtered_reports = _.filter(
    reports,
    (report) =>
      _.includes(report.id, search_text) ||
      _.includes(report.name, search_text) ||
      _.includes(report.text, search_text)
  );

  return filtered_reports;
}

export async function searchReportsById(id: string) {
  let id_num = _.parseInt(id);
  let reports = await openReports();

  let filtered_reports = _.find(reports, { id: id_num });

  return filtered_reports;
}

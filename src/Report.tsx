import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { searchReportsByText, searchReportsById } from "./search";

function Report() {
  let { id } = useParams();

  let res = searchReportsById(id).then((report) => {
    console.log(report);
  });

  return (
    <div>
      <h2>Report {id}</h2>
    </div>
  );
}

export default Report;

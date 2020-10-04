import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { searchReportsById, searchReportsByText } from "./search";
import _ from "lodash";

interface ReportsProps {
  searchText: string;
}

interface ReportsState {
  reports: any;
  lastSearchText: any;
}

class Reports extends Component<ReportsProps, ReportsState> {
  constructor(props: any) {
    super(props);
    this.state = { lastSearchText: undefined, reports: [] };
  }

  componentDidMount() {
    this.updateResults();
  }

  componentDidUpdate() {
    this.updateResults();
  }

  updateResults() {
    let { searchText } = this.props;
    let { lastSearchText } = this.state;
    if (lastSearchText === searchText) {
      return;
    }
    this.setState({ lastSearchText: searchText });

    _.debounce(() => {
      searchReportsByText(searchText).then((reports) => {
        this.setState({ reports: reports });
      });
    }, 300)();
  }

  renderText(text: string) {
    let textLimit = 200;
    let firstSentence = text.split(".", 1)[0];
    // Add period if exist
    if (text[firstSentence.length] === ".") {
      firstSentence += ".";
    }
    // Limit text length
    firstSentence = firstSentence.substr(0, textLimit);
    let textRest = text.substr(
      firstSentence.length + 1,
      textLimit - firstSentence.length
    );

    if (firstSentence.length + textRest.length >= textLimit) {
      textRest += " ...";
    }

    return (
      <span>
        <span className="textFirst">{firstSentence}</span>
        <span className="textRest">{textRest}</span>
      </span>
    );
  }

  render() {
    let { reports } = this.state;

    if (!_.isArray(reports)) {
      return <div>Loading...</div>;
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Report</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, i) => {
            return (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.name}</td>
                <td>{this.renderText(report.text)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Reports;

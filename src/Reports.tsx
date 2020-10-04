import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchReportsByText } from "./search";
import Tag from "./Tag";
import { getReportTags } from "./tags";
import _ from "lodash";

interface ReportsProps {
  searchText: string;
}

interface ReportsState {
  reports: any;
  lastSearchText: any;
  tags: any;
}

class Reports extends Component<ReportsProps, ReportsState> {
  constructor(props: any) {
    super(props);
    this.state = { lastSearchText: undefined, reports: [], tags: {} };
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
    let firstSentence = _.split(text, ".", 1)[0];
    // Add period if exist
    if (text[firstSentence.length] === ".") {
      firstSentence += ".";
    }
    // Limit text length
    firstSentence = firstSentence.substr(0, textLimit);
    let textRest = text.substr(
      firstSentence.length,
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

  renderTags(id: number) {
	  
    let tags = getReportTags(id);
    return (
      <>
        {tags.map((tag: any, i: any) => (
          <Tag
            key={id + "_" + i}
            isOnDoc={true}
            active={tag.active}
            text={tag.text}
          ></Tag>
        ))}
      </>
    );
  }

  render() {
    let { reports } = this.state;

    if (!_.isArray(reports)) {
      return <div>Loading...</div>;
    }

    return (
      <table className="table reportsTable">
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
                <td className="reportNameCol">
                  <Link to={"/report/" + report.id}>{report.name}</Link>
                </td>
                <td>
                  {this.renderText(report.text)} {this.renderTags(report.id)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Reports;

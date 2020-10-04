import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { searchReportsById } from "./search";
import _ from "lodash";

function Report() {
  let { id } = useParams();

  return <ReportComponent id={id} />;
}

interface ReportProps {
  id: string;
}

interface ReportState {
  report: any;
  reportExists: boolean;
}

class ReportComponent extends Component<ReportProps, ReportState> {
  constructor(props: any) {
    super(props);
    this.state = { report: undefined, reportExists: true };
  }

  componentDidMount() {
    let { id } = this.props;

    let parsed_id = _.parseInt(id);
    if (_.isNumber(parsed_id)) {
      searchReportsById(parsed_id).then((report) => {
        this.setState({ report: report, reportExists: !!report });
      });
    } else {
      this.setState({ reportExists: false });
    }
  }

  render() {
    let { report, reportExists } = this.state;

    if (!reportExists) {
      return <div>404 - Report Not Found</div>;
    }

    if (!report) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>{report.name}</h2>
        <p>{report.text}</p>
      </div>
    );
  }
}

export default Report;

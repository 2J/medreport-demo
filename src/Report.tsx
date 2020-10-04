import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { searchReportsById } from "./search";
import { saveReportTags, getUnusedTags, getReportTags } from "./tags";
import Tag from "./Tag";
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

  renderUnusedTags() {
    let { id } = this.props;
    let unusedTags = getUnusedTags(_.parseInt(id));

    return (
      <>
        {unusedTags.map((tag: any, i: any) => (
          <Tag
            key={id + "_un_" + i}
            isOnDoc={false}
            active={false}
            text={tag}
            controls={false}
          ></Tag>
        ))}
      </>
    );
  }

  renderUsedTags() {
    let { id } = this.props;
    let allTags = getReportTags(_.parseInt(id));
    let activeTags = _.filter(allTags, { active: true });
    let inactiveTags = _.filter(allTags, { active: false });
    return (
      <>
        <span className="bold">Active Tags</span> <br />
        {activeTags.map((tag: any, i: any) => (
          <Tag
            key={id + "_a_" + i}
            isOnDoc={true}
            active={tag.active}
            text={tag.text}
            controls={true}
          ></Tag>
        ))}
        <br />
        <span className="bold margin-top-20">Inctive Tags</span> <br />
        {inactiveTags.map((tag: any, i: any) => (
          <Tag
            key={id + "_in_" + i}
            isOnDoc={true}
            active={tag.active}
            text={tag.text}
            controls={true}
          ></Tag>
        ))}
      </>
    );
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
      <>
        <div className="row">
          <div className="col-md-2">
            <div className="hidden-sm-down">{this.renderUnusedTags()}</div>
          </div>
          <div className="col-md-8 col-sm-12">
            <h2>{report.name}</h2>
            <p>{report.text}</p>
          </div>
          <div className="col-md-2 col-sm-12">{this.renderUsedTags()}</div>
        </div>
      </>
    );
  }
}

export default Report;

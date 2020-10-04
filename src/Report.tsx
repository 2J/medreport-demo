import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { searchReportsById } from "./search";
import { saveReportTags, getUnusedTags, getReportTags } from "./tags";
import Tag from "./Tag";
import _ from "lodash";
import $ from "jquery";

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

  tagDragStart(e: any, tag: string, used: boolean) {
    e.dataTransfer.setData("tag", tag);
    e.dataTransfer.setData("used", used);
  }

  addTag(tag: string) {
    let { id } = this.props;
    let allTags = getReportTags(_.parseInt(id));
    allTags.push({ text: tag, active: true });
    saveReportTags(_.parseInt(id), allTags);
    this.setState(this.state); // force rerender
  }

  removeTag(tag: string) {
    let { id } = this.props;
    let allTags = getReportTags(_.parseInt(id));
    allTags = _.filter(allTags, (reportTag) => reportTag.text !== tag);
    saveReportTags(_.parseInt(id), allTags);
    this.setState(this.state); // force rerender
  }

  changeTagActiveStatus(tag: string) {
    let { id } = this.props;
    let allTags = getReportTags(_.parseInt(id));
    allTags = allTags.map((reportTag: { text: string; active: boolean }) => {
      if (reportTag.text === tag) {
        reportTag.active = !reportTag.active;
      }
      return reportTag;
    });
    saveReportTags(_.parseInt(id), allTags);
    this.setState(this.state); // force rerender
  }

  allowDrop(e: any) {
    e.preventDefault();
  }

  reportDrop(e: any) {
    e.preventDefault();
    let tag = e.dataTransfer.getData("tag");
    let used = e.dataTransfer.getData("used");
    if (used === "false") {
      this.addTag(tag);
    }
  }

  unusedDrop(e: any) {
    e.preventDefault();
    let tag = e.dataTransfer.getData("tag");
    let used = e.dataTransfer.getData("used");
    console.log(tag);
    if (used === "true") {
      this.removeTag(tag);
    }
    this.setState(this.state); // force rerender
  }

  renderUnusedTags() {
    let { id } = this.props;
    let unusedTags = getUnusedTags(_.parseInt(id));

    return (
      <>
        <span className="bold margin-top-20">Unused Tags</span> <br />
        {unusedTags.map((tag: any, i: any) => (
          <div
            key={id + "_un_" + i}
            className="inline-block"
            draggable="true"
            onDragStart={(e) => this.tagDragStart(e, tag, false)}
            onClick={(e) => this.addTag(tag)}
          >
            <Tag
              isOnDoc={false}
              active={false}
              text={tag}
              controls={false}
            ></Tag>
          </div>
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
          <div
            key={id + "_a_" + i}
            className="inline-block"
            draggable="true"
            onDragStart={(e) => this.tagDragStart(e, tag.text, true)}
            onClick={(e) => this.changeTagActiveStatus(tag.text)}
          >
            <Tag
              isOnDoc={true}
              active={tag.active}
              text={tag.text}
              controls={true}
            ></Tag>
          </div>
        ))}
        <br />
        <span className="bold margin-top-20">Inctive Tags</span> <br />
        {inactiveTags.map((tag: any, i: any) => (
          <div
            key={id + "_in_" + i}
            className="inline-block"
            draggable="true"
            onDragStart={(e) => this.tagDragStart(e, tag.text, true)}
            onClick={(e) => this.changeTagActiveStatus(tag.text)}
          >
            <Tag
              isOnDoc={true}
              active={tag.active}
              text={tag.text}
              controls={true}
            ></Tag>
          </div>
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
          <div
            className="col-md-2"
            onDrop={(e) => this.unusedDrop(e)}
            onDragOver={(e) => this.allowDrop(e)}
          >
            <div className="hidden-sm-down">{this.renderUnusedTags()}</div>
          </div>
          <div
            className="col-md-8 col-sm-12"
            onDrop={(e) => this.reportDrop(e)}
            onDragOver={(e) => this.allowDrop(e)}
          >
            <h2>{report.name}</h2>
            <p>{report.text}</p>
          </div>
          <div
            className="col-md-2 col-sm-12"
            onDrop={(e) => this.reportDrop(e)}
            onDragOver={(e) => this.allowDrop(e)}
          >
            {this.renderUsedTags()}
          </div>
        </div>
      </>
    );
  }
}

export default Report;

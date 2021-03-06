
import React, { Component } from "react";
import Loading from "./loading";
import '../assets/styles/loading.scss';
import '../assets/styles/app.scss';
import { connect } from 'react-redux'
import { selectItem } from '../actions/index'

class DetailCards extends Component {


  teammembers(members) {


    if (members.length === 0) {
      return (
        <div
          className={"nonmember"}
        >
          This team does not have a member yet.
        </div>
      )
    }
    return (members.map(member => {
      return (
        <div
          key={member.userId}
          className={"member"}

          onClick={() => {
            this.props.selectItem(member.userId)
          }}
        >
          {member.name.first} {member.name.last}
        </div>
      )
    })

    )
  }
  renderList() {
    if (this.props.activeItem === 'nosearchresult') {
      return (
        <div
          className="noResult"
        >
          <div
            className={"infoWrapper"}
          >
            <div
              className={"title"}
            >
              No search result :(
            </div>
          </div>
        </div>
      )
    }

    if (this.props.itemType === 'team') {
      const item = this.props.teams.filter(team => team.id === this.props.activeItem);
      const members = this.props.users.filter(user => user.teamId === item[0].id);
      // console.log(item);
      if (this.props.users.length === 0) {
        return (
          <Loading className="loaderContainer" />
        )
      }
      return (

        <div
          className="team"
        >
          <div
            className={"infoWrapper"}
          >
            <div
              className={"title"}
            >
              Team:  {item[0].name}
            </div>
            <p
              className={"overview"}
            >
              Leads by: {item[0].teamLeadName.first} {item[0].teamLeadName.last}
            </p>
            <p
              className={"overview"}
            >
              This team has {members.length} members.
            </p>
            <div
              className={"title"}
            >
              Members
            </div>
            <div
              className="teamMembers"
            >
              {this.teammembers(members)}
            </div>
          </div>

        </div>
      )
    }
    if (this.props.itemType === 'user') {
      const item = this.props.users.filter(user => user.userId === this.props.activeItem);
      const userteam = this.props.teams.filter(team => team.id === item[0].teamId);

      return (
        <div
          className="user"
        >
          <div
            className={"infoWrapper"}
          >
            <div
              className={"title"}
            >
              User:  {item[0].name.first} {item[0].name.last}
            </div>
            <div >
              Team:
            </div>
            <div
              className="teamMembers"
            >
              <div
                onClick={() => {
                  this.props.selectItem(userteam[0].id)
                }}
                className="member"
              >
                {userteam[0].name}
              </div>
            </div>
            <div>
              Leads by:
              </div>
            <div
              className="teamMembers"
            >
              <div
                onClick={() => {
                  this.props.selectItem(userteam[0].teamLead)
                }}
                className="member"
              >
                {userteam[0].teamLeadName.first} {userteam[0].teamLeadName.last}
              </div>
            </div>
          </div>

        </div>
      )
    }
  }
  render() {
    return (


      <div className="detailCard">
        {this.renderList()}
      </div>

    );
  }
}
function mapStateToProps(state) {
  return { teams: state.appState.teams, activeItem: state.appState.activeItem, users: state.appState.users };
}

export default connect(mapStateToProps, { selectItem: selectItem })(DetailCards);

import React from "react";

import "../styles/admin-dashboard.css";

class Admin extends React.Component {
  state = {
    monthlyStats: [],
  };

  constructor(props) {
    super(props);

    this.props = props;
  }

  componentDidMount() {
    this.props.loadBarbers().then(() => this.loadMonthwiseStatistics());
  }

  loadMonthwiseStatistics() {
    fetch(`http://localhost:8080/monthly-stats`)
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          ...this.state,
          monthlyStats: [...data],
        })
      );
  }

  getBarber(barberId) {
    const barberIndex = this.props.barbers.findIndex((barber) => barber.id === barberId);

    return `${this.props.barbers[barberIndex].firstName} ${this.props.barbers[barberIndex].lastName}`;
  }

  render() {
    return (
      <div className="container" id="admin-dashboard-container">
        <h2 className="page-title">Admin Dashboard</h2>
        <div className="monthly-stats-container">
          <ul>
            {this.state.monthlyStats.map((monthlyStat, index) => (
              <li key={index}>
                <div className="month-container">
                  <h4>{monthlyStat.month}, {monthlyStat.year}</h4>
                  <div className="stats-details">
                    {monthlyStat.stats.map((stat) => (
                      <div key={stat.id} className="stats-row">
                        <span className="stats-label">{this.getBarber(stat.id)}:</span>
                        <span className="stats-value">{stat.appointments}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Admin;

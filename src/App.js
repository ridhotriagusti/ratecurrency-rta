import React, { Component } from "react";
import "./App.css";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchData } from './actions';

class App extends Component {
  
  componentDidMount() {
    
    this.props.fetchData();
  }

  prettyCurrency = (crr, action) => {
    if (action === 0) {
      crr = (crr * 102) / 100;
    } else if (action === 1) {
      crr = (crr * 98) / 100;
    } else {
      // Do nothing...
    }
    var fixedCrr = crr.toFixed(6).toString();
    while (fixedCrr.length < 8) {
      fixedCrr = "0" + fixedCrr;
    }

    return fixedCrr;
  };

  createTable = () => {

    const { data } = this.props;
    let table = [];
    let children = [];
    let displayedCurrencies = ["IDR", "CAD", "JPY", "CHF", "EUR", "USD"];

   children.push(

    data.filter((item) => (
      displayedCurrencies.includes(item[0])
    ))

    .map((item) => (
      <tr key={item[0]}>
        <td>{item[0]}</td>
        <td>{this.prettyCurrency(item[1], 0)}</td>
        <td>{this.prettyCurrency(item[1])}</td>
        <td>{this.prettyCurrency(item[1], 1)}</td>
      </tr>
    ))
    );

    table.push(<tbody>{children}</tbody>); // We create the parent tbody tags and add the inner loop (children).

    return table;
  };

  render() {

    const { loading } = this.props;
    
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <div className="App-body">
            <table className="currencyTable">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>WE BUY</th>
                  <th>EXCHANGE RATE</th>
                  <th>WE SELL</th>
                </tr>
              </thead>
              {this.createTable()}
            </table>
            <p>
              * base currency is IDR
              <br />* As for the API,&nbsp;
              <a href="https://exchangeratesapi.io/">
                https://exchangeratesapi.io/
              </a>
              &nbsp;is used.
            </p>
          </div>
        </main>
      );
    }
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  ),
  date: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

App.defaultProps = {
  data : [],
};

const mapStateToProps = (state) => ({
  data: state.rates.data,
  date: state.rates.date,
  loading: state.rates.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (url) => dispatch(fetchData(url)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);

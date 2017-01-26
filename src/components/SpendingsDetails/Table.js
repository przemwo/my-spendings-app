import React from 'react';
import { connect } from 'react-redux';
import { updateSpendingAmount, updateSpendingDescription, updateSpendingDay, updateSpendingCategory } from '../../actions/actions';
import Row from './Row';
import dynamicSort from '../../utils/dynamicSort';

class TableIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editedRowId: '',
      sortBy: 'day'
    };
    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.sortTableBy = this.sortTableBy.bind(this);
  }
  toggleIsEditing(id) {
    id = id || '';
    this.setState((prevState, props) => {
      return {
        editedRowId: id
      };
    });
  }
  updateRow(id, amount, description, day, category) {
    const {dispatch, spendings }  = this.props;
    const spending = this.getSpending(id, spendings);
    if(amount !== spending.amount) {
      dispatch(updateSpendingAmount(id, amount));
    }
    if(description !== spending.description) {
      dispatch(updateSpendingDescription(id, description));
    }
    if(day !== spending.day) {
      dispatch(updateSpendingDay(id, day));
    }
    if(category !== spending.category) {
      dispatch(updateSpendingCategory(id, category));
    }
  }
  getSpending(id, spendings) {
    return spendings.filter(spending => spending.id === id)[0];
  }
  sortTableBy(e) {
    const { value: sortBy } = e.target;
    this.setState({
      sortBy
    });
  }
  render() {
    const categories = this.props.categories;
    let spendings = this.props.spendings;
    const total = spendings.reduce((sum, spending) => {
      return sum += parseInt(spending.amount);
    }, 0);
    spendings = spendings.sort(dynamicSort(this.state.sortBy));
    return(
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th role="button" onClick={this.sortTableBy} value="day">Day</th>
            <th role="button" onClick={this.sortTableBy} value="amount">Amount</th>
            <th role="button" onClick={this.sortTableBy} value="category">Category</th>
            <th role="button" onClick={this.sortTableBy} value="description">Description</th>
          </tr>
        </thead>
        <tbody>
          {spendings.map((spending, index) =>
            <Row
              key={spending.id}
              spending={spending}
              categories={categories}
              index={index}
              isEditing={this.state.editedRowId === spending.id}
              toggleIsEditing={this.toggleIsEditing}
              updateRow={this.updateRow}
            />
          )}
          <tr className="info">
            <th colSpan="2">Total</th>
            <th>{total}</th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
    );
  }
}
TableIndex.propTypes = {
  spendings: React.PropTypes.array,
  categories: React.PropTypes.array,
  dispatch: React.PropTypes.func
};
const mapStateToProps = (state) => {
  return {
    spendings: state.spendings,
    categories: state.categories
  };
};
const Table = connect(mapStateToProps)(TableIndex);
export default Table;

import * as types from './actionsTypes';
import projectApi from '../api/projectApi';

export const getSpendingsSuccess = (spendings) => {
  return {
    type: types.GET_SPENDINGS_SUCCESS,
    spendings
  };
};
export const getSpendings = () => {
  return (dispatch, getState) => {
    return projectApi.getSpendings().then(res => {
      dispatch(getSpendingsSuccess(res));
    }).catch(error => {
      throw(error);
    });
  };
};

export const addSpendingSuccess = (spending) => {
  return {
    type: types.ADD_SPENDING_SUCCESS,
    spending
  };
};
export const addSpending = (spending) => {
  return (dispatch, getState) => {
    const state = getState();
    const timestamp = new Date(state.dates.year, state.dates.month, state.dates.day);
    spending.timestamp = timestamp.getTime();
    spending.year = state.dates.year;
    spending.month = state.dates.month;
    spending.day = state.dates.day;
    spending.status = "active";
    return projectApi.addSpending(spending).then(res => {
      dispatch(addSpendingSuccess(spending));
    }).catch(error => {
      throw(error);
    });
  };
};

export const deleteSpendingSuccess = (id) => {
  return {
    type: types.DELETE_SPENDING_SUCCESS,
    id
  };
};
export const deleteSpending = (id) => {
  return (dispatch, getState) => {
    return projectApi.deleteSpending(id).then(res => {
      dispatch(deleteSpendingSuccess(id));
    }).catch(error => {
      throw(error);
    });
  };
};

export const updateSpendingAmountSuccess = (id, amount) => {
  return {
    type: types.UPDATE_SPENDING_AMOUNT_SUCCESS,
    id,
    amount
  };
};
export const updateSpendingAmount = (id, amount) => {
  return (dispatch, getState) => {
    return projectApi.updateSpendingAmount(id, amount).then(res => {
      dispatch(updateSpendingAmountSuccess(id, amount));
    }).catch(error => {
      throw(error);
    });
  };
};

export const getCategoriesSuccess = (categories) => {
  return {
    type: types.GET_CATEGORIES_SUCCESS,
    categories
  };
};
export const getCategories = () => {
  return (dispatch, getState) => {
    return projectApi.getCategories().then(res => {
      dispatch(getCategoriesSuccess(res));
    }).catch(error => {
      throw(error);
    });
  };
};

export const getFavouriteCategoriesSuccess = (favouritecategories) => {
  return {
    type: types.GET_FAVOURITE_CATEGORIES_SUCCESS,
    favouritecategories
  };
};
export const getFavouriteCategories = () => {
  return (dispatch, getState) => {
    return projectApi.getFavouriteCategories().then(res => {
      dispatch(getFavouriteCategoriesSuccess(res));
    }).catch(error => {
      throw(error);
    });
  };
};

export const updateDate = (date) => {
  return {
    type: types.UPDATE_DATE,
    date
  };
};
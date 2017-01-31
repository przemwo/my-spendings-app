import React from 'react';

const SelectCategory = ({
  selectedCategoryId,
  handleOnChange,
  categories
}) => {
  return(
    <div className="form-group">
      <select className="form-control" value={selectedCategoryId} onChange={handleOnChange}>
        {categories.map((category, index) =>
          <option key={category.id} value={category.id}>{category.name}</option>
        )}
      </select>
    </div>
  );
};

export default SelectCategory;

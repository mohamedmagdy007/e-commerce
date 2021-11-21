import React from 'react'

export default function Filter(props) {
    return (
        <>
        <div className="filter-sort">
          Order{" "}
          <select value={props.sort} onChange={props.sortProducts}>
            <option>Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-category">
          Filter{" "}
          <select value={props.category} onChange={props.filterProducts}>
            <option value="">ALL</option>
            <option value="desk">Desk</option>
            <option value="chairs">Chairs</option>
          </select>
        </div>
      </>
    )
}

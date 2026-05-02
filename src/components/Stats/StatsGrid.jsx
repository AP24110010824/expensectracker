import React from 'react'
import Calculatestats from '../../utils/Calculatestats';
const StatsGrid = ({expense}) => {
    const {total,avg,topCategory}=Calculatestats(expense);
  return (
    <div style={{ border: "1px solid white", padding: "10px", margin: "10px" }}>
      <h3>total:${total}</h3>
      <h3>avarage:${avg}</h3>
      <h3>Top category:{topCategory}</h3>
    </div>
  )
}

export default StatsGrid;

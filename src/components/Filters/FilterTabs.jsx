import React from 'react'

const FilterTabs = ({filter,setFilter}) => {
    const categories=["ALL","Food","Shopping","Health","Entertainment"];

  return (
    <div>
      {categories.map((cat)=>(<button key={cat} onClick={()=>setFilter(cat)}style={{margin:"5px",background:filter===cat?"black":"gray",color:'white',}}>{cat}</button>))}  
    </div>
  )
}

export default FilterTabs;

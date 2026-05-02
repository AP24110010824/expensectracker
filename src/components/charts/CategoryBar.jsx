import React from 'react'
import Groupbycategory from '../../utils/Groupbycategory'
const CategoryBar = ({expense}) => {
    const data=Groupbycategory(expense);
    const max=Math.max(...Object.values(data),1);

  return (
    <div style={{ border: "1px solid white", padding: "10px", margin: "10px" }}>
        <h3>category Breakdown</h3>
        {
            Object.entries(data).map(([cat,value])=>(
                <div key={cat} style={{margin:"8px 0"}}>
                    <div>{cat}-${value}</div>
                    <div style={{
              height: "10px",
              width: `${(value / max) * 100}%`,
              background: "green",
            }}></div>
            </div>
            ))
        }
      
    </div>
  )
}

export default CategoryBar;

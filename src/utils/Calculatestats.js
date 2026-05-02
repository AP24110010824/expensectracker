 const Calculatestats=(expense)=>{
    const total=expense.reduce((acc,curr)=>acc+curr.amount,0);
    const avg=expense.length?total/expense.length:0;
    const categorymap={};
    expense.forEach((e) => {categorymap[e.category]=(categorymap[e.category]||0)+e.amount});
    let topCategory="None";
    let max=0;
    for(let cat in categorymap)
    {
        if(categorymap[cat]>max)
        {
            max=categorymap[cat];
            topCategory=cat;
        }
    }

        return{total,avg,topCategory};
    };
  export default Calculatestats;
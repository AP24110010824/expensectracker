const Groupbycategory=(expense)=>{
    const map={};
    expense.forEach((e)=>{
        map[e.category]=(map[e.category]||0)+e.amount;
    });
    return map;

}
export default Groupbycategory;
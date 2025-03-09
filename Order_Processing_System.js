function createOrderManager(){
    let oderlist=[]
    return {
        addOrders:function(oder){
            oderlist.push(oder)
        },
        updateOders:function(id,newStatus){
            oderlist.find((e)=>{
                if (id==e.id){
                    e.status=newStatus
                }
            })
        },
        filterOrders:function(status){
            return oderlist.filter((e)=>{
                if(e.status==status){
                    return e
                }
            })
        },
        sortOrders:function(by){
            let copy=oderlist.map((e)=>e)
            if(by=="status"){
                return copy.sort((a,b)=>a.status.localeCompare(b.status))
            }
            else if(by=="Date"){
                return copy.sort((a,b)=>a.Date-b.Data)
            }
            return "choose either status or Date for sorting"
        },
        getTotalRevenue:function(){
            return oderlist.reduce((ren,e)=>ren+=e.items[0].price*e.items[0].quantity,0)
        },
        exportOrders:function(){
            return JSON.stringify(oderlist)
        }
    }
}
const manager = createOrderManager();
manager.addOrders({ id: 1, customerName: "Alice", items: [{ name: "Laptop", price: 1000, quantity: 1 }], status: "pending", createdAt: new Date("2024-03-01") });
manager.addOrders({ id: 2, customerName: "Bob", items: [{ name: "Phone", price: 500, quantity: 2 }], status: "shipped", createdAt: new Date("2024-03-02") });
console.log(manager.filterOrders("pending"));

console.log(manager.getTotalRevenue());

// console.log(manager.sortOrders("status"))
//console.log(manager.exportOrders())






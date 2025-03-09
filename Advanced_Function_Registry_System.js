function createFunctionRegistry(){
    let userData={}
    return {
        registerFunction:function(name, fn){
            userData[name]=fn
        },
        executeFunction:function(name, args, context = null){
            let bond=userData[name].bind()
            return bond(args)
        },
        mapFunction:function(name, dataArray){
            return dataArray.map((e)=>{
                return userData[name](e)
            })
        },
        filterFunction:function(name, dataArray){
            return dataArray.filter((e)=>{
                return (userData[name](e)==true)
            })
        },
        reduceFunction:function(name, dataArray, initialValue){
            return dataArray.reduce((acc,e)=>{
                acc+=userData[name](e)
                return acc
            },initialValue)
        },
        executeFunctionAsync:function(name, args, delay){
            return new Promise((res,rej)=>{
                setTimeout(()=>{
                    res(userData[name](args))
                },delay)
            })
        },
        exportRegistry:function(){
            return JSON.stringify([userData])
        }
    }
}
const registry = createFunctionRegistry();
registry.registerFunction("double", x => x * 2);
// registry.registerFunction("Add", x => x + 2);
console.log(registry.executeFunction("double", [5]));
// console.log(registry.executeFunction("Add", [5]))

registry.executeFunctionAsync("double", [4], 2000).then((e)=>(console.log(e)));
// console.log(registry.exportRegistry()) 
// console.log(registry.reduceFunction("double",[1,2,3,4,5],0))

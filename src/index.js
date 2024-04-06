const app=require("./app/app")

const port=4200;

app.listen(port,()=>{
    console.log(`server corriendo ${port}`);
});
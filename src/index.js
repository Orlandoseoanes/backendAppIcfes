const app=require("./app/app")

const port=process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`server corriendo ${port}`);
});
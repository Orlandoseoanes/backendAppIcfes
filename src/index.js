const app=require("./app/app")

const port=process.env.PORT || 4250;

app.listen(port,()=>{
    console.log(`server corriendo ${port}`);
});
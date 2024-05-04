const express = require("express");
const router = express();
const ModelContentPractice = require("../app/models/modeloContenidoPractica")

router.post("/ContentPractice/Register", async (req, res) => {
 try{
    const{ IdPractica,IdPregunta}=req.body;
    const NewContentPractice = new ModelContentPractice({
        IdPractica,
        IdPregunta
    });
    const SavedContentPractice = await NewContentPractice.save();
    res.status(201).json(SavedContentPractice);
    console.log("ContentPractice created");


 }catch(error){
        console.error("Error creating content practice:", error);
        res.status(500).json({error: "Internal server error"});
 }

})

router.get("/ContentPractice/GetAll", async (req, res) => {
    try{
        const ContentPractice = await ModelContentPractice.find();
        res.status(200).json(ContentPractice);
        console.log("ContentPractice found");
    }catch(error){
        console.error("Error finding content practice:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/ContentPractice/GetByPracticeId/:Id", async (req, res) => {
    try{
        const {Id} = req.params;
        const ContentPractice = await ModelContentPractice.find({IdPractica: Id});
        res.status(200).json({
            ContentPractice,
            message: "ContentPractice found"
        });
    }catch(error){
        console.error("Error finding content practice:", error);
        res.status(500).json({error: "Internal server error"});
    }
})


module.exports = router;

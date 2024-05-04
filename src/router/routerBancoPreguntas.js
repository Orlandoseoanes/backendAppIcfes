const express = require("express");
const router = express();
const QuestionBankModel = require("../app/models/modeloBancoPreguntas");

// Endpoint to create a new question
router.post("/Question/Register", async (req, res) => {
    try {

        const { id, Question, Answer, OptionA, OptionB, OptionC, OptionD, Photo,Subject } = req.body;

        const NewQuestion = new QuestionBankModel({
            id,
            Question,
            Answer,
            OptionA,
            OptionB,
            OptionC,
            OptionD,
            Photo,
            Subject
        });
        const SavedQuestion = await NewQuestion.save();

        res.status(201).json(SavedQuestion);
    } catch (error) {
        console.error("Error creating question:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/Questions",async(req,res)=>{
    try {
        const questions = await QuestionBankModel.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error getting questions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


router.get("/Questions/:Subject",async(req,res)=>{
    try {
        const {Subject} = req.params;
        const questions = await QuestionBankModel.find({Subject});
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error getting questions:", error);
        res.status(500).json({ error: "Internal server error" });
    }

})




module.exports = router;

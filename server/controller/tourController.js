const TourSchema = require("../models/Tours")


const createTour = async (req, res) => {
    const newTour = new TourSchema(req.body);
    
    console.log(newTour)
    try {
        const savedTour = await newTour.save();
        
        res.status(200).json({
            success: true, message: "successfully create",
            data: savedTour
        })
    } catch (error) {
        res.status(500).json({
            success: false, message: "Faile to create ,Try again",
            // data: savedTour
        })
    }
}


module.exports = createTour;


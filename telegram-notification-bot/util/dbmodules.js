require("../src/db/conn");
const tgramSlot = require("../src/models/slotModel");

// Create Slots Data 
const createUser = async (chat_id) => {
    try{
        const slotDB = new tgramSlot({
            chat_id: chat_id,
            slots: [{
                session_id: "Undefined",
                date: "Undefined",
                name: "Undefined",
                address: "Undefined",
                vaccineName: "Undefined",
                pincode: 000000,
                district: "Undefined",
                minAge: 0,
                availableDoses: 0,
                vaccineType: "Undefined",
            }]
        })
        
        const result = await slotDB.save();
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

// Get old slots 
const getOldSlots = async (chat_id) => {
    try {
        const result = await tgramSlot.find({chat_id: chat_id})
        .select({ _id: 0, slots:1})
        if(result.length > 0){
            sl = result[0].slots; 
            return sl
        }else{
            console.log("No data found in database! Creating Dummy User...");
            createUser(chat_id)
        }
    } catch (err) {
        console.log(err);
    }
}

// update the document 
const updateNewSlots = async (chat_id, slotArray) => {
    try {
        var d = new Date();
        var currentDateTime = d.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }, { hour12: true});
        const result = await tgramSlot.updateOne({chat_id},{
            $set: {
                last_updated: currentDateTime,
                slots: slotArray
            }
        })
    } catch (err) {
         console.log(err);
    }
}

module.exports = {getOldSlots, updateNewSlots}
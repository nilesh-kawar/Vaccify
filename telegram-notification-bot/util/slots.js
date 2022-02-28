const axios = require("axios");

const newSlots = async (chat_id, district) => {
    try {
        const url = `http://localhost:3000/api/slots?district=${district}`;
        const res = await axios(url);
        centers = res.data;
        slotsArr = [];
        centers.forEach((item) => {
            item.sessions.forEach((session) => {
                    if(session.availableDoses > 0){
                        let centerData = {
                            session_id : session.session_id,
                            date: session.date,
                            name: item.name,
                            minAge: session.minAge,
                            address: item.address,
                            pincode: item.pincode,
                            district: item.district,
                            vaccineName: session.vaccineName,
                            availableDoses: session.availableDoses,
                            vaccineType: session.vaccineType
                        }
                        slotsArr.push(centerData);
                    }
                })
        })
        // console.log(slotsArr);
        return slotsArr;
    } catch (error) {
        console.log(error);
    }
}

module.exports = newSlots;


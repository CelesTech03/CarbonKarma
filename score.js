import * as SecureStore from 'expo-secure-store';
import { UpdateScore, UpdateLastAdd, getLastAdd, getScore, getLastAllow } from './config/firebase';

//Return the values stored in the local storage.
export async function getStoredVal() {
    try {
        const vals = await SecureStore.getItemAsync("values");
        if(vals != undefined) {
            return JSON.parse(vals);
        }
    } catch(error) {
        console.log(error);
    }
}

//Return the score stored in the local storage.
export async function getStoredScore() {
    try {
        const score = await SecureStore.getItemAsync("score");
        if(score != undefined) {
            return score;
        }
    } catch(error) {
        console.log(error);
    }
}

//Saved the new value to the local storage.
async function saveVal(val, type) {
    try {
        let vals = {
            electricity: 0,
            food: 0,
            transportation: 0
        };
        const values = await SecureStore.getItemAsync("values");
        if(values != undefined) {
            vals = JSON.parse(values);
        }

        if(vals.hasOwnProperty(type)) {
            vals[type] = Number(vals[type]) + val;
        }
        await SecureStore.setItemAsync("values", JSON.stringify(vals));
    } catch (error) {
        console.log(error);
    }
}

//Reset the values stored in the local storage.
async function resetVals() {
    try {
        const vals = {
            electricity: 0,
            food: 0,
            transportation: 0
        };
        await SecureStore.setItemAsync("values", JSON.stringify(vals));
    } catch (error) {
        console.log(error);
    }
}

//Check if the user log in at least 24 hours after
//the last time score of 15 is added.
//Add 15 if true.
export async function addScore() {
    try {
        //let last_add = Number(await SecureStore.getItemAsync("lastAddTime"));
        let last_add = Number(await getLastAdd());
        if(Number.isNaN(last_add)) {
            const new_score = await updateScore(150);
            if(new_score != undefined) {
                //await SecureStore.setItemAsync("lastAddTime", String(Date.now()));
                await UpdateLastAdd(Date.now());
                await resetVals();
                return new_score;
            }
            return;
        }
        const day = 24 * 60 * 60 * 1000;
        let num_of_days = Math.floor((Date.now() - last_add) / day);
        if(num_of_days > 0) {
            const new_score = await updateScore(150);
            if(new_score != undefined) {
                //await SecureStore.setItemAsync("lastAddTime", String(Date.now()));
                await UpdateLastAdd(Date.now());
                await resetVals();
                return new_score;
            }
        }
    } catch (error) {
        console.log(error);
    } 
}

//Update the score.
async function updateScore(adjust) {
    try {
        //let prev_score = Number(await SecureStore.getItemAsync("score"));
        let prev_score = Number(await getScore());
        if(Number.isNaN(prev_score)) {
            //await SecureStore.setItemAsync("score", String(150));
            await UpdateScore(150); 
            prev_score = 150;
            return 150;
        }
        const new_score = Number(prev_score) + adjust;
        if(new_score != undefined) {
            //await SecureStore.setItemAsync("score", String(new_score));
            await UpdateScore(new_score);
        }
        return new_score;
    } catch (error) {
        console.log(error);
    }
}

//Emission factors for calculating food value.
const meat_factor = {
    "Poultry": [0.468, 0.525],
    "Seafood": [0.261, 0.302],
    "Other meat": [0.396, 0.449]
};
const plant_factor = {
    "Grains": [1.461, 1.609],
    "Vegetables": [0.203, 0.292],
    "Fruits": [0.194, 0.271]
};
const dairy_factor = {
    "Cheese": [0.405, 0.455],
    "Milk": [0.337, 0.393]
};
const food_factor = {
    "meat": meat_factor,
    "plants": plant_factor,
    "dairy": dairy_factor
};


//Categories and types of foods which the score can be calculated
//with the current score calculation.
export const food_category = Object.keys(food_factor);
export const meat_type = Object.keys(meat_factor);
export const plant_type = Object.keys(plant_factor);
export const dairy_type = Object.keys(dairy_factor);


//Calculates the value of a food entry and updates the score.
//Parameter category is category of food in String.
//Parameter type is type of food in String.
//Parameter location is a Boolean of whether the food is purchased from
//farmer market or not.
//Parameter price is the purchased price of the food in Number.
//Return the calculated value of the food entry if score updates successfully.
export async function foodVal(category, type, location, price) {
    try {
        const convert_rate = 0.83;
    
        if(food_factor.hasOwnProperty(category)) {
            if(food_factor[category].hasOwnProperty(type)) {
                let emission_factor = food_factor[category][type][(location == 'Farmer\'s market' ? 0 : 1)];
                let converted_price = price * convert_rate;
                let val = Math.round(emission_factor * converted_price*-10);

                const new_score = await updateScore(val);
            
                if(new_score != undefined) {
                    await saveVal(val, "food");
                    return val;
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

//Emission factor for calculating transportation value.
const trans_factor = {
    "Car": 0.332,
    "Bus": 0.056,
    "Train": 0.099
};

//Types of vehicles which the score can be calculated
//with the current score calculation.
export const vehicle_type = Object.keys(trans_factor);

//Calculates the value of a transportation entry and updates the score.
//Parameter vehicle is type of vehicle used to travel in String.
//Parameter miles is the mileage traveled in Number.
//Return the calculated value of the transportation entry if score updates successfully.
export async function transVal(vehicle, miles) {
    try {
        if(trans_factor.hasOwnProperty(vehicle)) {
            let emission_factor = trans_factor[vehicle];
            let val = Math.round(emission_factor * miles*-10);
    
            const new_score = await updateScore(val);
    
            if(new_score != undefined) {
                await saveVal(val, "transportation");
                return val;
            }
        }
    } catch (error) {
        console.log(error);
    }  
}

//Emission factor for calculating electricity value.
const electricity_factor = {
    "NYC": 634.6
};

//Locations which the score can be calculated
//with the current score calculation.
export const electricity_location = Object.keys(electricity_factor);

//Calculates the value of an electricity entry and updates the score.
//Parameter location is the location of the user in String.
//Parameter usage is the electricity usage in kWh in Number.
//Return the calculated value of the electricity entry if score updates successfully.
export async function electricityVal(location, usage) {
    try {
        let diff = await allowElectricityEntry();
        if(diff == 0) {
            const offset = 2520;
            let converted_usage = usage / 1000;
            if(electricity_factor.hasOwnProperty(location)) {
                let emission_factor = electricity_factor[location];
                let val = Math.round(emission_factor * converted_usage  * 0.453 * -10);

                const new_score = await updateScore(offset + val);
                
                if(new_score != undefined) {
                    await saveVal(val, "electricity");
                    //await SecureStore.setItemAsync('lastAllowTime', String(Date.now()));
                    return val;
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

//Check if the user request for making a new energy entry is made
//at least 30 days after the last request.
//Return 0 if is true and otherwise return the time, in millisecond, 
//that the user still need to wait before able to create a new
//entry.
export async function allowElectricityEntry() {
    try {
        //const last_allow = Number(await SecureStore.getItemAsync("lastAllowTime"));
        const last_allow = await getLastAllow();
        if(last_allow == undefined) {
            //await SecureStore.setItemAsync('lastAllowTime', String(Date.now()));
            return 0;
        }

        const cycle = 24 * 60 * 60 * 1000 * 30;
        return Math.max(0, cycle - (Date.now() - last_allow));
    } catch(error) {
        console.log(error);
    }
}


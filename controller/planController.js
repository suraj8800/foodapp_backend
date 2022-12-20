const FoodplanModel = require("../model/planModel");
const { findByIdAndDelete } = require("../model/usermodle");
async function getAllplansController(req, res){
    try{
        let plans = await FoodplanModel.find();
        res.status(200).json({
            Allplans: plans
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            err: err.message
        });
    }
    
}

async function createPlanController(req, res){
    try{
        let planObjData = req.body;
        console.log(req.body); 
        const isDataPresent = Object.keys(planObjData).length > 0;
        if(isDataPresent){
            let newPlan = await FoodplanModel.create(planObjData);
            console.log("10 planController", newPlan);
            res.status(201).json({
                result:"plan created",
                plan : newPlan
            })

        }else {
            req.status(404).json({
                message:"Data is incomolete"
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err.message
        });
    }
}

async function getPlansController(req, res){
    try{
        let id = req.params.planRoutes;
        let plan = await FoodplanModel.findById(id);
        
        res.status(200).json({
            result: "plan found",
            plan: plan
        });
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            res: res.message
        })
    }
}

async function updatePlanController(req, res){
    try{
        console.log("to update", req.body);
        let planupdateObjData = req.body;
        let id = req.params.planRoutes;
        console.log(id);

        const isDataPresent = Object.keys(planupdateObjData).length > 0;

        if(isDataPresent){
            const plan = await FoodplanModel.findById(id);

            for(let key in planupdateObjData){
                plan[key] = planupdateObjData[key];
            }

            await plan.save();
            res.status(200).json({plan});
        }else{
            res.status(404).json({
                message: "noting to update"
            })
        }
    }
    catch (err){
        console.log(err)
        res.status(500).json({
            res: res.message
        })
    }
}

async function deletePlanController(req, res){
    try{
        let id = req.params.planRoutes;
        let plan = await findByIdAndDelete(id);

        res.status(200).json({
            result: "plan found",
            plan: plan
        });
    }
    catch (err){
        console.log(err)
        res.status(500).json({
            err: err.message
        })
    }
}

module.exports = {
    getAllplansController,
    createPlanController,
    updatePlanController,
    deletePlanController,
    getPlansController
}
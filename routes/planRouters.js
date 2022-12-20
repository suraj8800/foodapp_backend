const express = require("express");
const planRouter = express.Router();
const {getAllplansController,
    createPlanController,
    updatePlanController,
    deletePlanController,
    getPlansController

} = require("../controller/planController")
const {protectRoute} = require("../controller/authController");
// plans -> get all the plans -> sensitive route -> protected route.
planRouter.route("/")
          .get(getAllplansController)
          .post(createPlanController)
planRouter.route("/:planRoutes")
          .patch(updatePlanController)
          .delete(deletePlanController)
          .get(getPlansController)  


module.exports = planRouter;
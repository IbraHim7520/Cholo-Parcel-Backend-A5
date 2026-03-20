import { Router } from "express"
import { userController } from "./user.controller";
import ValidateReqBody from "../../middlewere/ValidateZodSchema";
import { userLoginSchema, userSignupSchema } from "./user.zodschema";

const userRoute = Router();


//User authentication API's
//publicly access
userRoute.post("/sign-up", ValidateReqBody(userSignupSchema) , userController.handleUserSignUp);
userRoute.post('/sign-in', ValidateReqBody(userLoginSchema), userController.handleUserLogin);

//authenticated access




export default userRoute;   
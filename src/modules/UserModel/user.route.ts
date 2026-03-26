import { Router } from "express"
import { userController } from "./user.controller";
import ValidateReqBody from "../../middlewere/ValidateZodSchema";
import { userChangePasswordZodSchema, userLoginSchema, userSignupSchema } from "./user.zodschema";
import upload from "../../config/multer";

const userRoute = Router();


//User authentication API's
//publicly access
userRoute.post("/sign-up", ValidateReqBody(userSignupSchema) , userController.handleUserSignUp);
userRoute.post('/sign-in', ValidateReqBody(userLoginSchema), userController.handleUserLogin);

//authenticated access
userRoute.post("/sign-out", userController.handleUserLogout)
userRoute.post("change-password", ValidateReqBody(userChangePasswordZodSchema), userController.handleChangePassword);
userRoute.post("/upload-image", upload.single("image"), userController.handleUploadImage);


userRoute.get("/me", userController.handleGetUserData)

export default userRoute;   
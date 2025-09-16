import { Router } from "express"
import { UserRolesEnum } from "../utils/constants.js"
const router = Router()

router.route("/:projectId")
    .get(getNotes)
    .post(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.MEMBER]), createNote)
    
export default router;

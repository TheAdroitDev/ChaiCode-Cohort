import { Router } from "express"
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js"
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/note.controller.js";
const router = Router()

router.route("/:projectId")
    .get(validateProjectPermission(AvailableUserRoles),getNotes)
    .post(validateProjectPermission([UserRolesEnum.ADMIN]), createNote)
    
router.route("/:projectId/n/:noteId")
    .get(validateProjectPermission([AvailableUserRoles],getNotes))
    .put(validateProjectPermission([UserRolesEnum.ADMIN],updateNote))
    .delete(validateProjectPermission([UserRolesEnum.ADMIN],deleteNote))
export default router;

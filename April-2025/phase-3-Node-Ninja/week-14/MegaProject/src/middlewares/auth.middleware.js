import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "");

    // Validation
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verifyJWT(token, process.env.JWT_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -emailVerificationExpiry -emailVerificationToken -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Inavlid access Token")
    }
})

export const validateProjectPermission = (roles = []) => {
    asyncHandler(async (req, res) => {
        const { ProjectId } = req.params;

        if (!ProjectId) {
            throw new ApiError(404, "Invalid Project");
        }

        const project = await ProjectMember.find({
            project: project,
            user: req.user._id
        })

        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        const givenRole = project?.role;

        req.user.role = givenRole;

        if (!roles.includes(givenRole)) {
            throw new ApiError(403, "You do not have permission to perform this action")
        }

        next();
    })
}
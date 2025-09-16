import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.model.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import mongoose from "mongoose";

const getProjects = asyncHandler(async (req, res) => {
    // aggregate
    return res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully"))
});

const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    // Validation
    if (!project) {
        throw new ApiError(404, "Project not found")
    }
});

const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    const project = await Project.create({
        name,
        description,
        createdBy: req.user_id
    })

    await ProjectMember.create({
        user: req.user._id,
        project: project._id,
        role: UserRolesEnum.ADMIN
    })

    return res.status(201).json(new ApiResponse(201, project, "Project created successfully"));
});

const updateProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const { name, description } = req.body;

    const project = await Project.findByIdAndUpdate(projectId,
        {
            name,
            description
        },
        {
            new: true
        }
    );

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json(new ApiResponse(200, project, "Project updated successfully"));

});

const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json(new ApiResponse(200, project, "Project deleted successfully"));
});

const addMemberToProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { email, role, username } = req.body;

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "Invalid User")
    }

    await ProjectMember.findOneAndUpdate(
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId),
        },
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId),
            role: role,
        },
        {
            new: true,
            upsert: true,
        },
    );

    return res.status(201).json(new ApiResponse(201, {}, "Project member added successfully"));

})

const getProjectMembers = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }
    //   aggregate

    return res.status(200).json(new ApiResponse(200, projectMembers, "Project members fetched"));
})

const updateMemberRole = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.params;
    const { newRole } = req.body;

    if (!AvailableUserRoles.includes(newRole)) {
        throw new ApiError(400, "Invalid role");
    }

    let projectMember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
    });

    if (!projectMember) {
        throw new ApiError(404, "Project member not found");
    }

    projectMember = await ProjectMember.findByIdAndUpdate(
        projectMember._id,
        {
            role: newRole,
        },
        { new: true },
    );

    if (!projectMember) {
        throw new ApiError(404, "Project member not found");
    }

    return res.status(200).json(new ApiResponse(200, projectMember, "Project member role updated successfully",),);

})


const deleteMember = asyncHandler(async(req, res) => {
    const { projectId, userId } = req.params;

    let projectMember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
    });

    if (!projectMember) {
        throw new ApiError(404, "Project member not found");
    }

    projectMember = await ProjectMember.findByIdAndDelete(projectMember._id);

    if (!projectMember) {
        throw new ApiError(404, "Project member not found");
    }

    return res.status(200).json(new ApiResponse(200, projectMember, "Project member deleted successfully",),);
})

export { getProjects, getProjectById, createProject, updateProject, deleteProject, addMemberToProject, updateMemberRole, deleteMember, getProjectMembers }
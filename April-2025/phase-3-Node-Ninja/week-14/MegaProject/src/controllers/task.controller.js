import { mongoose } from mongoose;
import { Project } from "../models/project.models.js";
import { SubTask } from "../models/subtask.models.js"
import { Task } from "../models/task.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { UserRolesEnum } from "../utils/constants.js";

const getTasks = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)

    // Validation
    if (!project) {
        throw new ApiError(404, "Project not found")
    }

    const tasks = await Task.find({
        project: projectId,
    }).populate("assignedTo", "username fullNamer avatar");

    return res.status(200).json(new ApiResponse(200, "Tasks fetched successfully", tasks))
});

const getTaskById = asyncHandler(async (req, res) => {
    const { taskId } = req.params;

    const task = Task.findById(taskId).populate("assignedTo", "username fullName avatar");

    // Validation
    if (!task || task.length === 0) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, task[0], "Task fetched successfully"))
});

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, assignedTo } = req.body;

    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    // Validation
    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // ensure files is an array or empty array if undefined
    const files = req.files || [];
    const attachments = files.map((file) => {
        return {
            url: `${process.env.SERVER_URL}/images/${file.originalname}`,
            mimetype: file.mimetype,
            size: file.size
        }
    })

    const task = await Task.create({
        title,
        description,
        project: projectId,
        assignedTo: assignedTo ? assignedTo : undefined,
        assignedBy: req.user_id,
        status,
        attachments
    })

    return res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
    const { title, description, status, assignedTo } = req.body;
    const { taskId } = req.params;

    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
        throw new ApiError(404, "Task not found");
    }

    // Get existing attachments 
    const existingAttachments = existingTask.attachments || [];

    // Ensure req.files is an array or empty array if undefined
    const files = req.files || [];

    // Create new attachments array from uploaded files
    const newAttachments = files.map((file) => {
        return {
            url: `${process.env.SERVER_URL}/images/${file.originalname}`,
            mimetype: file.mimetype,
            size: file.size,
        };
    });

    // Combine existing and new attachments
    const allAttachments = [...existingAttachments, ...newAttachments];

    // Create update object with only the fields that are provided(updated)
    const updateFields = {
        attachments: allAttachments,
        assignedBy: req.user_id
    };

    // add the only fields which are provided in the request
    if (title !== undefined) updateFields.title = title
    if (description !== undefined) updateFields.description = description
    if (status !== undefined) updateFields.status = status

    // carefully
    if (assignedTo !== undefined) {
        updateFields.assignedTo = assignedTo || undefined
    }
    else {
        updateFields.assignedTo = existingTask.assignedTo
    }

    const task = await Task.findByIdAndUpdate(taskId, updateFields, {
        new: true,
    }).populate("assignedTo", "username fullName avatar");

    return res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, task, "Task deleted successfully"));
});

const createSubTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { title } = req.body;

    // Validation
    if (!title) {
        throw new ApiError(400, "Title is required")
    };

    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError(404, "Task not found")
    };

    const subTask = await SubTask.create({
        title,
        task: taskId,
        createdBy: req.user_id
    });
    return res.status(201).json(new ApiResponse(201, subTask, "Sub task created successfully"));
});

const updateSubTask = asyncHandler(async (req, res) => {
    const { subTaskId } = req.params;
    const { title, isCompleted } = req.body;

    const subTask = await SubTask.findById(subTaskId);

    // Validation 
    if (!subTask) {
        throw new ApiError(404, "Sub task not found");
    }

    // update and save subTask
    subTask = await SubTask.findByIdAndUpdate(subTaskId, {
        title: [UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN].includes(req?.user?.role) ?
            title : undefined, // only allow admins and project admins to update the title,
        isCompleted,
    },
        { new: true }
    )
});

const deleteSubTask = asyncHandler(async (req, res) => {
    const { subTaskId } = req.params;

    const subTask = await SubTask.findByIdAndDelete(subTaskId);

    if (!subTask) {
        throw new ApiError(404, "Sub task not found");
    }

    return res.status(200).json(new ApiResponse(200, subTask, "Sub task deleted successfully"));
});

export { getTasks, getTaskById, deleteTask, createSubTask, deleteSubTask, createTask, updateTask, updateSubTask }
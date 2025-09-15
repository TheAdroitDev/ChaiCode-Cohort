import mongoose from 'mongoose';
import { Project } from "../models/project.models.js"
import { ProjectNote } from "../models/note.models.js"
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";


const getNotes = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    // validation
    if (!project) {
        throw new ApiError(404, "Invalid project")
    }

    const notes = await Project.find({
        project: projectId,
    }).populate("createdBy", "username fullName avatar");

    return res.status(200).json(new ApiResponse(200, notes, "Notes fetched successfully"));
});

const getNoteById = asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    const note = ProjectNote.findById(noteId).populate("createdBy", "username fullName avatar");

    // validation
    if (!note) {
        throw new ApiError(404, "Note not found")
    }

    return res.status(200).json(new ApiResponse(200, note, "Note fetched successfully"));

})

const createNote = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { content } = req.body;

    const project = await Project.findById(projectId);

    // validation
    if (!project) {
        throw new ApiError(404, "Project not found")
    }

    const note = await ProjectNote.create({
        project: projectId,
        content,
        createdBy: req.user_id
    })

    // populate the createdBy before sending response 
    const populatedNote = await ProjectNote.findById(note._id).populate("createdBy", "username fullName avatar");

    return res.status(201).json(new ApiResponse(201, "Note created successfully", populatedNote))
})

const updateNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const { content } = req.body;

    const existingNote = await ProjectNote.findById(noteId)

    // Validate if the note exists
    if (!existingNote) {
        throw new ApiError(404, "Invalid note")
    }

    // Populate the note and createdBy field 
    const note = await ProjectNote.findByIdAndUpdate(noteId,
        {
            content
        },
        {
            new: true
        }
    ).populate("createdBy", "username fullName avatar");

    return res.status(201).json(new ApiResponse(201, "Note updated successfully", note))
});

const deleteNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    const note = await ProjectNote.findByIdAndDelete(noteId)

    if (!note) {
        throw new ApiError(404, "Invalid note")
    }
})

export { getNotes, getNoteById, createNote, updateNote, deleteNote }
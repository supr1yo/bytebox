import { Request, Response } from "express";

const uploadVideo = async (req: Request, res: Response) => {
    return res.json(req.file);
}


export {
    uploadVideo
}
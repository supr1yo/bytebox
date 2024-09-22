import { Request, Response } from "express";

const uploadFile = async(req: Request, res: Response) => {
    return res.json({
        file: req.file
    });
}



export {
    uploadFile
}
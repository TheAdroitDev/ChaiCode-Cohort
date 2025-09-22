import type { Request, Response } from "express";

class HealthController {
    public handleHealthCheck(req: Request, res: Response) {
        return res.json({
            status: "Okay"
        })
    }
}

export default HealthController;
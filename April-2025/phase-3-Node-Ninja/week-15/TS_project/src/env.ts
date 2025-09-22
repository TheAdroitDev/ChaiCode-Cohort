import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().optional(),
    mongouri: z.string()
})

function createEnv(env: NodeJS.ProcessEnv) {
    const validatonResult = envSchema.safeParse(env);
    if (!validatonResult.success) {
        throw new Error(validatonResult.error.message);
    }
    return validatonResult.data
}

export const env = createEnv(process.env)
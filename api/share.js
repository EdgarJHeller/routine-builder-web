import { Redis } from "@upstash/redis";
import { v4 as uuidv4 } from "uuid";

const redis = Redis.fromEnv();
const TTL_SECONDS = 90 * 24 * 60 * 60; // 90 days

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();

    if (req.method === "POST") {
        const routine = req.body;
        if (!routine || typeof routine !== "object") {
            return res.status(400).json({ error: "Invalid routine payload" });
        }
        const id = uuidv4();
        await redis.set(`routine:${id}`, JSON.stringify(routine), { ex: TTL_SECONDS });
        return res.status(201).json({ id });
    }

    if (req.method === "GET") {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "Missing id" });
        const data = await redis.get(`routine:${id}`);
        if (!data) return res.status(404).json({ error: "Not found or expired" });
        const routine = typeof data === "string" ? JSON.parse(data) : data;
        return res.status(200).json(routine);
    }

    return res.status(405).json({ error: "Method not allowed" });
}
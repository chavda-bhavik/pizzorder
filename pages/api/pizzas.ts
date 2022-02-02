import type { NextApiRequest, NextApiResponse } from 'next';
import data from './pizzas.json';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.status(200).json(data);
}
import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../pizzas.json';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: { id },
    } = req;

    let pizza = data.find(
        (pizza) => pizza.id === String(id)
    );
    if (!pizza) {
        res.status(404).json({
            message: `No pizza found with id ${id}`,
        });
        return;
    }

    res.status(200).json(pizza);
}

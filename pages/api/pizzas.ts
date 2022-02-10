import type { NextApiRequest, NextApiResponse } from 'next';
import data from './pizzas.json';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let formattedData = data.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        imageUrl: item.imageUrl,
        prices: {
            medium: item.prices.medium,
        },
    }));
    res.status(200).json(formattedData);
}

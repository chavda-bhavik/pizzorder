import type { NextApiRequest, NextApiResponse } from 'next';
import data from './pizzas.json';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    if (id) {
        let pizza = data.find((pizza) => pizza.id === String(id));
        if (!pizza) {
            res.status(404).json({
                message: `No pizza found with id ${id}`,
            });
            return;
        }

        res.status(200).json(pizza);
    } else {
        let grouppedData: GrouppedPizzaType = {};
        let categories: string[] = [];
        grouppedData = data.reduce<GrouppedPizzaType>((acc, item: PizzaItemType) => {
            categories = item.categories;
            categories.forEach((category: string) => {
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push({
                    id: item.id,
                    title: item.title,
                    subtitle: item.subtitle,
                    imageUrl: item.imageUrl,
                    categories,
                    prices: {
                        medium: item.prices.medium,
                        small: item.prices.small,
                    },
                });
            });
            return acc;
        }, {});
        res.status(200).json(grouppedData);
    }
}

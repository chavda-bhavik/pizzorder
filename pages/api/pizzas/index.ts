import type { NextApiRequest, NextApiResponse } from 'next';
import data from './pizzas.json';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
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

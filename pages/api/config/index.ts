import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let configData: ConfigType = {
        extraCheesePrice: 75,
        deliveryCharge: 35,
        taxRate: 0.08,
        toppingPrice: 60,
    }
    res.status(200).json(configData);
}

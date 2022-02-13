import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // Validate the request type
        if (req.method !== "POST") {
            res.status(400).send({ message: 'Only POST requests allowed' })
            return
        }

        // Validate the request body
        let body = JSON.parse(req.body) as OrderDataType;
        if (
            !body.user || !body.user.name || !body.user.phone || !body.user.address || !body.user.cardNumber || !body.user.cvc || !body.user.expiry ||
            !Array.isArray(body.pizzas) || body.pizzas.length === 0
        ) {
            res.status(400).send({ message: 'Missing required fields' })
            return
        }

        // Send the order response
        let orderData = {
            id: "41a71013-18d5-459c-9cb3-cdcb9d86d337",
            ...body
        }

        res.status(201).json(orderData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' })
    }
}

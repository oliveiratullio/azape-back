import Order from "../models/Order";

class DashboardsController {
    async getDashboard(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 100;
            const skip = (page - 1) * limit;

            const orders = await Order.find({})
                                      .skip(skip)
                                      .limit(limit);

            const total = await Order.countDocuments({});

            const ordersTotal = orders.reduce((acc, order) => acc + order.payment.amount, 0);
            const salesCount = orders.length;
            const averageTicket = salesCount ? (ordersTotal / salesCount).toFixed(2) : 0;

            const totalPages = Math.ceil(total / limit);
            const hasMore = page < totalPages;

            const response = {
                orders_total: ordersTotal,
                orders_count: salesCount,
                sales_total: ordersTotal,
                sales_count: salesCount,
                average_ticket: averageTicket,
                orders: orders,
                has_more: hasMore,
                limit: limit,
                total_pages: totalPages,
                page: page,
                total: total
            };

            return res.json(response);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: true,
                message: 'Erro interno no servidor'
            });
        }
    }
}

export default new DashboardsController();

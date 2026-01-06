// controllers/admin/dashboard.controller.js
const Account = require("../../models/account.model");
const User = require("../../models/user.model");
const Order = require("../../models/order.model");
const Product = require("../../models/product.model");

// [GET] /admin/dashboard
module.exports.index = async (req, res) => {
  try {
    const statistic = {
      accounts: {
        total: 0,
        active: 0,
        inactive: 0,
      },
      users: {
        total: 0,
        newToday: 0,
        newThisMonth: 0,
      },
      products: {
        total: 0,
        active: 0,
        inactive: 0,
        outOfStock: 0,
      },
      orders: {
        total: 0,
        totalRevenue: 0,
        todayOrders: 0,
        todayRevenue: 0,
      },
    };

    // Thống kê Accounts
    statistic.accounts.total = await Account.countDocuments({
      deleted: false,
    });
    statistic.accounts.active = await Account.countDocuments({
      deleted: false,
      status: "active",
    });
    statistic.accounts.inactive = await Account.countDocuments({
      deleted: false,
      status: "inactive",
    });

    // Thống kê Users (Khách hàng)
    statistic.users.total = await User.countDocuments({
      deleted: false,
    });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    statistic.users.newToday = await User.countDocuments({
      deleted: false,
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // User đăng ký trong tháng này
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    statistic.users.newThisMonth = await User.countDocuments({
      deleted: false,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    // Thống kê Products
    statistic.products.total = await Product.countDocuments({
      deleted: false,
    });
    statistic.products.active = await Product.countDocuments({
      deleted: false,
      status: "active",
    });
    statistic.products.inactive = await Product.countDocuments({
      deleted: false,
      status: "inactive",
    });
    statistic.products.outOfStock = await Product.countDocuments({
      deleted: false,
      stock: 0,
    });

    // Thống kê Orders
    const orders = await Order.find({ deleted: false });
    statistic.orders.total = orders.length;

    // Tính tổng doanh thu
    orders.forEach((order) => {
      order.products.forEach((item) => {
        const finalPrice =
          item.price * (1 - item.discountPercentage / 100) * item.quantity;
        statistic.orders.totalRevenue += finalPrice;
      });
    });

    // Thống kê đơn hàng hôm nay
    const todayOrders = await Order.find({
      deleted: false,
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    statistic.orders.todayOrders = todayOrders.length;

    // Tính doanh thu hôm nay
    todayOrders.forEach((order) => {
      order.products.forEach((item) => {
        const finalPrice =
          item.price * (1 - item.discountPercentage / 100) * item.quantity;
        statistic.orders.todayRevenue += finalPrice;
      });
    });

    // Lấy 5 sản phẩm bán chạy nhất
    const topProducts = await Order.aggregate([
      { $match: { deleted: false } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product_id",
          totalQuantity: { $sum: "$products.quantity" },
          totalRevenue: {
            $sum: {
              $multiply: [
                "$products.price",
                "$products.quantity",
                {
                  $subtract: [
                    1,
                    { $divide: ["$products.discountPercentage", 100] },
                  ],
                },
              ],
            },
          },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
    ]);

    // Lấy thông tin chi tiết sản phẩm
    const topProductsDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await Product.findOne({
          _id: item._id,
          deleted: false,
        });
        return {
          ...item,
          title: product?.title || "Unknown",
          thumbnail: product?.thumbnail || "",
          price: product?.price || 0,
        };
      })
    );

    // Lấy đơn hàng gần đây
    const recentOrders = await Order.find({ deleted: false })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("userInfo products createdAt");

    // Top khách hàng mua nhiều nhất
    const topCustomers = await Order.aggregate([
      { $match: { deleted: false } },
      {
        $group: {
          _id: "$userInfo.email",
          fullName: { $first: "$userInfo.fullName" },
          phone: { $first: "$userInfo.phone" },
          totalOrders: { $sum: 1 },
          totalSpent: {
            $sum: {
              $sum: {
                $map: {
                  input: "$products",
                  as: "item",
                  in: {
                    $multiply: [
                      "$item.price",
                      "$item.quantity",
                      {
                        $subtract: [
                          1,
                          { $divide: ["$item.discountPercentage", 100] },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
    ]);

    // Thống kê doanh thu theo tháng (6 tháng gần nhất)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          deleted: false,
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      { $unwind: "$products" },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: {
            $sum: {
              $multiply: [
                "$products.price",
                "$products.quantity",
                {
                  $subtract: [
                    1,
                    { $divide: ["$products.discountPercentage", 100] },
                  ],
                },
              ],
            },
          },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Format dữ liệu doanh thu theo tháng
    const revenueChart = monthlyRevenue.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      revenue: Math.round(item.revenue),
      orderCount: item.orderCount,
    }));

    res.render("admin/pages/dashboard/index", {
      title: "Trang chủ",
      statistic,
      topProducts: topProductsDetails,
      topCustomers,
      recentOrders,
      revenueChart,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.redirect("/admin");
  }
};

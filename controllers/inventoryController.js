const User = require("../models/user");
const Location = require("../models/locations");

// GET /api/inventory/checkBought
exports.checkBought = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const locations = await Location.find(); // master list

        if (!user) {
            return res.json({ code: 404, message: "User not found" });
        }

        // user's purchased location ids
        const userOwned = user.Location.map(l => l.mapId.toString());

        // prepare final response
        const finalLocations = locations.map(loc => ({
            _id: loc._id.toString(),
            address: loc.address,
            price: loc.price,
            isLocked: !userOwned.includes(loc._id.toString())
        }));

        return res.json({
            code: 200,
            message: "Inventory loaded",
            body: {
                guapBalance: user.guapBalance,
                Avatar: user.Avatar,
                Location: finalLocations,
                Accessories: user.Accessories
            }
        });

    } catch (err) {
        console.log(err);
        res.json({ code: 500, message: "Server error" });
    }
};



// POST /api/inventory/buyInventory
exports.buyInventory = async (req, res) => {
    try {
        const { id, price, name, type } = req.body;

        const user = await User.findById(req.user.id); //from auth
        if (!user) return res.json({ code: 404, message: "User not found" });

        if (user.guapBalance < parseInt(price)) {
            return res.json({ code: 400, message: "Not enough Guap" });
        }

        user.guapBalance -= parseInt(100);

        user.Location.push({
            mapId: id,
            isLocked: false
        });

        await user.save();

        return res.json({
            code: 200,
            message: "Item purchased",
            body: {
                guapBalance: user.guapBalance,
                Avatar: user.Avatar,
                Location: user.Location,
                Accessories: user.Accessories
            }
        });

    } catch (err) {
        console.log(err);
        return res.json({ code: 500, message: "Server error" });
    }
};

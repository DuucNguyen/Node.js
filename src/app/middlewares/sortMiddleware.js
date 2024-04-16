module.exports = function sortMiddleware(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: "default",
    };

    if (req.query.hasOwnProperty("_sort")) {
        const isValidType = ["asc", "desc"].includes(req.query.type);
        Object.assign(res.locals._sort, {
            //override properties have the same name
            enabled: true,
            type: isValidType ? req.query.type : "default",
            column: req.query.column,
        });
    }

    next();
};

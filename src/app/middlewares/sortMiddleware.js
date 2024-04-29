module.exports = function sortMiddleware(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: "default",
    };

    if (req.query.hasOwnProperty("_sort")) {
        const isValidType = ["asc", "desc"].includes(req.query.type); //handle invalid sort type URL
        // console.log("md-req.query.column: " + req.query.column);
        // console.log("md-req.query.type: "+ req.query.type)


        Object.assign(res.locals._sort, {
            //override properties have the same name
            enabled: true,
            type: isValidType ? req.query.type : "default",
            column: req.query.column, 
        });

        // console.log("local._sort.column: "+ res.locals._sort.column);
        // console.log("local._sort.type: "+ res.locals._sort.type);
    }

    next();
};

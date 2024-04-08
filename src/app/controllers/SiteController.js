class SiteController {
    //[GET] /Home
    async home(req, res) {
        res.render('home');
    }
    //[GET] /search
    async search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

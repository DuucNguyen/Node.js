class NewsController {
    //[GET] /news ("/")
    async index(req, res) {
        res.render('news');
    }
    //[GET] /news/:slug (receive params from URL)
    async show(req, res) {
        res.send('Detail');
    }
}

module.exports = new NewsController();

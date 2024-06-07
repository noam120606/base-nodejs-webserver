module.exports = {
    url: "/generate",
    protocol: "GET",
    run: (app, req, res) => {
        if (!req.session.auth) return res.redirect('/login');
        res.render('generate');
    },
};
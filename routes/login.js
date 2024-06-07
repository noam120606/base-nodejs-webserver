module.exports = {
    url: "/login",
    protocol: "GET",
    run: (app, req, res) => {

        const email = req.query?.email;
        const password = req.query?.password;

        if (email) {
            app.db.query(`SELECT * FROM accounts WHERE email='${email}';`, (err, request) => {
                if (err) return console.error(err);
                if (request.length < 1) return res.render('login', { error: "Le compte n'a pas été trouvé" });
                if (request[0].password != password) return res.render('login', { error: "Le mot de passe est incorrect" });
                req.session.email = email;
                req.session.auth = true;
                res.redirect("/");
            });
        } else {
            res.render('login', {error: ""});
        };
    },
};
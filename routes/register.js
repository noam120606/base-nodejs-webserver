module.exports = {
    url: "/register",
    protocol: "GET",
    run: (app, req, res) => {

        const email = req.query?.email;
        const password = req.query?.password;

        if (email) {
            app.db.query(`SELECT * FROM accounts WHERE email='${email}';`, (err, request) => {
                if (err) return console.error(err);
                if (request.length < 1) {
                    app.db.query(`INSERT INTO accounts VALUES ('${email}', '${password}');`);
                    res.redirect('/login');
                } else {
                    res.render('register', {error: "Ce compte existe déja"});
                }
            });
        } else {
            res.render('register', {error: ""});
        };
    },
};
const { readdirSync } = require('fs');
module.exports = app => {

    const files = readdirSync('./routes');

    files.forEach(file => {

        const route = require(`../routes/${file}`);

        switch (route.protocol) {
            case "GET":
                app.get(route.url, (req, res) => route.run(app, req, res));
            break;
            case "POST":
                app.post(route.url, (req, res) => route.run(app, req, res));
            break;
        };

    });

};
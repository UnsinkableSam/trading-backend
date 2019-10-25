module.exports = (app) => {
    app.get("/", function (req, res, next) {
        const data = {
            data: {
                msg: "Hej hej hemskt mycket hej! Jag heter sam och studerar på BTH webbprogrammering!"
            }
        };

        res.json(data);
    });

};
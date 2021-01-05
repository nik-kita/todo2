module.exports = {
    init(app) {
        app.use('/', (req, res) => res.status(200).json({ sms: 'Make something aweosome!' }));
    },
};

module.exports = (sequelize, Sequelize) => {
    const GpidClient = sequelize.define("gpidClient", {
        name: {
            type: Sequelize.STRING
        }
    });
    return GpidClient;
}
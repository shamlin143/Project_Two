module.exports = function(sequelize, DataTypes) {
  const Text = sequelize.define("text", {
    user_id: DataTypes.STRING,
    text: DataTypes.STRING,
    post_rating: DataTypes.DECIMAL(5, 4)
  });
  Text.associate = function(models) {
    Text.belongsToMany(models.User, { through: "userLikes" });
  };
  return Text;
};

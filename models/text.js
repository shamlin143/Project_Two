module.exports = function(sequelize, DataTypes) {
  const Text = sequelize.define("text", {
    user_id: DataTypes.STRING,
    text: DataTypes.STRING,
    post_rating: {
      type: DataTypes.INTEGER(10),
      default: 0,
      allowNull: false
    }
  });

  return Text;
};

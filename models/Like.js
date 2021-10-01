module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    // Model attributes are defined here
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Like;
};

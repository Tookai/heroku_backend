module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    // Model attributes are defined here
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Comment;
};

import {
    Association,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
    CreationOptional,
    DataTypes,
    InferCreationAttributes,
    InferAttributes,
    Model,
    NonAttribute,
    Sequelize
  } from 'sequelize'
  import type { Post } from './Post'
  
  type PostMetaAssociations = 'post'
  
  export class PostMeta extends Model<
    InferAttributes<PostMeta, {omit: PostMetaAssociations}>,
    InferCreationAttributes<PostMeta, {omit: PostMetaAssociations}>
  > {
    declare id: CreationOptional<number>
    declare key: string
    declare content: string | null
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
  
    // PostMeta belongsTo Post
    declare post?: NonAttribute<Post>
    declare getPost: BelongsToGetAssociationMixin<Post>
    declare setPost: BelongsToSetAssociationMixin<Post, number>
    declare createPost: BelongsToCreateAssociationMixin<Post>
    
    declare static associations: {
      post: Association<PostMeta, Post>
    }
  
    static initModel(sequelize: Sequelize): typeof PostMeta {
      PostMeta.init({
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        key: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true
        },
        content: {
          type: DataTypes.TEXT
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      }, {
        sequelize
      })
      
      return PostMeta
    }
  }
  
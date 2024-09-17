import { integer, text, sqliteTable, type AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique(),
  invitedBy: integer('invitedBy').references((): AnySQLiteColumn => users.id),
  profile: text('profile'),
  bio: text('bio'),
  role: text('role'),
  interests: text('interests')
})

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  authorId: integer('authorId').references(() => users.id),
  title: text('title'),
  votes: integer('votes'),
  reports: integer('reports'),
  type: text('type'),
  url: text('title'),
  tags: text('tags')
})

export const insertPostSchema = createInsertSchema(posts);
export const selectPostSchema = createSelectSchema(posts);

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: integer('postId').references(() => posts.id),
  authorId: integer('authorId').references(() => users.id),
  replyToId: integer('replyToId').references((): AnySQLiteColumn => comments.id),
  content: text('content')
})

export const insertCommentSchema = createInsertSchema(comments);
export const selectCommentSchema = createSelectSchema(comments);
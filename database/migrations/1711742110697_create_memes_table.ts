import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'memes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('post_link')
      table.string('type')
      table.string('subreddit')
      table.string('title')
      table.string('url')
      table.boolean('nsfw')
      table.boolean('spoiler')
      table.string('author')
      table.integer('ups')
      table.json('preview')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

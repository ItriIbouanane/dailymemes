import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import axios from 'axios'

export default class Meme extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare post_link: string

  @column()
  declare subreddit: string

  @column()
  declare title: string

  @column()
  declare url: string

  @column()
  declare type: string

  @column()
  declare nsfw: boolean

  @column()
  declare spoiler: boolean

  @column()
  declare author: string

  @column()
  declare ups: number

  @column()
  declare preview: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static getAvatar = () => {
    let imgs = [
      'https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_545452.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_A06A42.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_C18D42.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_FF4500.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_FF8717.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_FFB000.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_FFD635.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_DDBD37.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_D4E815.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_94E044.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_46A508.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_46D160.png',
    ]
    return imgs[Math.floor(Math.random() * imgs.length)]
  }

  static getMeme = async (subreddit: string) => {
    let meme = await axios.get('https://meme-api.com/gimme/' + subreddit)
    return meme
  }

  static StoreMemeifNotExists = async (meme: any, type: string) => {
    let existingMeme = await this.query().where('post_link', meme.data.postLink).first()

    if (!existingMeme) {
      await this.create({
        post_link: meme.data.postLink,
        subreddit: meme.data.subreddit,
        title: meme.data.title,
        url: meme.data.url,
        nsfw: meme.data.nsfw,
        spoiler: meme.data.spoiler,
        type,
        author: meme.data.author,
        ups: meme.data.ups,
        preview: JSON.stringify(meme.data.preview),
      })
    }
  }

  static getMostLikedMeme = async (type: string) => {
    let mostLikedMeme = await this.query()
      .where('type', '=', type)
      .andWhereRaw('DATE(created_at) = CURDATE() - INTERVAL 1 DAY')
      .orderBy('ups', 'desc')
      .first()
    return mostLikedMeme
  }
}

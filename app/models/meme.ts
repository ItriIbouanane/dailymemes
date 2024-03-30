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
      'https://www.redditstatic.com/avatars/avatar_default_01_A06A42.png',
      'https://www.redditstatic.com/avatars/avatar_default_02_FF4500.png',
      'https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png',
      'https://www.redditstatic.com/avatars/avatar_default_04_FF0000.png',
      'https://www.redditstatic.com/avatars/avatar_default_05_C18D42.png',
      'https://www.redditstatic.com/avatars/avatar_default_06_008985.png',
      'https://www.redditstatic.com/avatars/avatar_default_07_006D90.png',
      'https://www.redditstatic.com/avatars/avatar_default_08_484848.png',
      'https://www.redditstatic.com/avatars/avatar_default_09_FF66AC.png',
      'https://www.redditstatic.com/avatars/avatar_default_10_43B02A.png',
      'https://www.redditstatic.com/avatars/avatar_default_11_336699.png',
      'https://www.redditstatic.com/avatars/avatar_default_12_994499.png',
      'https://www.redditstatic.com/avatars/avatar_default_13_6699CC.png',
      'https://www.redditstatic.com/avatars/avatar_default_14_66CCFF.png',
      'https://www.redditstatic.com/avatars/avatar_default_15_99CCFF.png',
      'https://www.redditstatic.com/avatars/avatar_default_16_669966.png',
      'https://www.redditstatic.com/avatars/avatar_default_17_99CC99.png',
      'https://www.redditstatic.com/avatars/avatar_default_18_99CC66.png',
      'https://www.redditstatic.com/avatars/avatar_default_19_99CC33.png',
      'https://www.redditstatic.com/avatars/avatar_default_20_99CC00.png',
    ]
    return imgs[Math.floor(Math.random() * imgs.length)]
  }

  static getMeme = async (subreddit: string) => {
    let meme = await axios.get('https://meme-api.com/gimme/' + subreddit)
    return meme
  }

  static StoreMemeifNotExists = async (meme: any) => {
    let existingMeme = await this.query().where('post_link', meme.data.postLink).first()

    if (!existingMeme) {
      await this.create({
        post_link: meme.data.postLink,
        subreddit: meme.data.subreddit,
        title: meme.data.title,
        url: meme.data.url,
        nsfw: meme.data.nsfw,
        spoiler: meme.data.spoiler,
        type: 'general',
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

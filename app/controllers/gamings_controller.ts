import Meme from '#models/meme'
import type { HttpContext } from '@adonisjs/core/http'

export default class GamingsController {
  async index({ view }: HttpContext) {
    let meme = await Meme.getMeme('gamingmemes')
    let getavatar = Meme.getAvatar

    await Meme.StoreMemeifNotExists(meme)

    let mostLikedMeme = await Meme.getMostLikedMeme('gaming')

    return view.render('pages/home', {
      meme: meme.data,
      type: 'gaming',
      img: getavatar,
      mostLikedMeme,
    })
  }
}

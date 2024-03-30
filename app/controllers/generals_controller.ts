import Meme from '#models/meme'
import type { HttpContext } from '@adonisjs/core/http'

export default class GeneralsController {
  async index({ view }: HttpContext) {
    let meme = await Meme.getMeme('memes')
    let getavatar = Meme.getAvatar

    await Meme.StoreMemeifNotExists(meme, 'general')

    let mostLikedMeme = await Meme.getMostLikedMeme('general')

    return view.render('pages/home', {
      meme: meme.data,
      type: 'general',
      img: getavatar,
      mostLikedMeme,
    })
  }
}

import Meme from '#models/meme'
import type { HttpContext } from '@adonisjs/core/http'

export default class ArtsController {
  async index({ view }: HttpContext) {
    let meme = await Meme.getMeme('artmemes')
    let getavatar = Meme.getAvatar

    await Meme.StoreMemeifNotExists(meme)

    let mostLikedMeme = await Meme.getMostLikedMeme('art')

    return view.render('pages/home', {
      meme: meme.data,
      type: 'art',
      img: getavatar,
      mostLikedMeme,
    })
  }
}

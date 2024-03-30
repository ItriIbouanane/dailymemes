import Meme from '#models/meme'
import type { HttpContext } from '@adonisjs/core/http'

export default class FrenchesController {
  async index({ view }: HttpContext) {
    let meme = await Meme.getMeme('MemeFrancais')
    let getavatar = Meme.getAvatar

    await Meme.StoreMemeifNotExists(meme, 'french')

    let mostLikedMeme = await Meme.getMostLikedMeme('french')

    return view.render('pages/home', {
      meme: meme.data,
      type: 'french',
      img: getavatar,
      mostLikedMeme,
    })
  }
}

import Meme from '#models/meme'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProgrammingsController {
  async index({ view }: HttpContext) {
    let meme = await Meme.getMeme('ProgrammerHumor')
    let getavatar = Meme.getAvatar

    await Meme.StoreMemeifNotExists(meme, 'programming')

    let mostLikedMeme = await Meme.getMostLikedMeme('programming')

    return view.render('pages/home', {
      meme: meme.data,
      type: 'programming',
      img: getavatar,
      mostLikedMeme,
    })
  }
}

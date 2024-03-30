const GeneralsController = () => import('#controllers/generals_controller')
const ProgrammingsController = () => import('#controllers/programmings_controller')
const ArtsController = () => import('#controllers/arts_controller')
const GamingsController = () => import('#controllers/gamings_controller')
import router from '@adonisjs/core/services/router'

router.get('/', [GeneralsController, 'index'])
router.get('/programming', [ProgrammingsController, 'index'])
router.get('/gaming', [GamingsController, 'index'])
router.get('/art', [ArtsController, 'index'])

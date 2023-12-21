import multer from 'multer'
import path from 'path'
import { generatedID } from '../lib/tokens.js'

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb){
            console.log(file)
            cb(null, './src/public/img/uploads/')
        },
        filename: function( req, file, cb){
            cb(null, generatedID() + path.extname(file.originalname))
        }
    }  
)

const upload = multer({ storage})

export default upload;
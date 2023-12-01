import path from 'path';

//Esto no cambia
export default {mode:'development',
entry:{
    map: './src/lib/map.js'},
output:{
    filename:'[name].js',
    path: path.resolve('src/public/js')
}

}
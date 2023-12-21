import User from './User.js'
import Category from './Category.js'
import Price from './Price.js'
import Property from './Property.js'

// hasOne: relaciones 1:1 (sintaxis: Vendedor.hasOne(Propiedad); de derecha a izquierda)
// belongsTo: relaciones 1:1 (sintaxis: Propiedad.belongsTo(Vendedor) de izquierda a derecha)
// hasMany: relaciones 1:N (sintaxis: Vendedor.hasMany(Propiedad) == propiedad llave foranea que haga referencia al vendedor)
// belongsToMany: relación N:N (sintaxis: Estudiante.belongsToMany(Clase, { through: 'HorarioClase' }))

Property.belongsTo(User,{foreignKey: 'user_ID'})
Category.hasOne(Property,{foreignKey: 'category_ID'})
Price.hasOne(Property,{foreignKey:'price_ID'})

export {
    User,
    Category,
    Price,
    Property
}
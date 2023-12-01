const formProperty = async(req,res) => {
    res.render('property/create.pug',{
        page: 'New Property',
        showHeader: true
    })
    // const [categories.prices]=await Promise.all(Category.findAll(),Price.findAll());
}

const insertProperty = (req,res) => {
    return 0
}
const updateProperty = (req,res) => {
    return 0
}
const deleteProperty = (req,res) => {
    return 0
}
const findAllProperties = (req,res) => {
    return 0
}
const findAllByUserProperties = (req,res) => {
    return 0
}
const findOneProperty = (req,res) => {
    return 0
}

const saveProperty = (req,res) => {
    //TODO: Realizar validaciones de los campos antes de intentar guardar
    //TODO: Implementar el autorellenado en el formulario


    // const {title,}

    // const savaedProperty
    res.json({
        msg:"La Propiedad ha sido guardada"
    })
    return 0
}

export {
    formProperty,
    insertProperty,
    updateProperty,
    deleteProperty,
    findAllProperties,
    findAllByUserProperties,
    findOneProperty,
    saveProperty
}
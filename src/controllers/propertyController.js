import Property from "../models/Property.js";
import Category from '../models/Category.js'
import Price from '../models/Price.js'    

const insertProperty = (req,res) =>{
    res.render('property/create.pug')
}
const updateProperty = (req,res) =>{
    return 0
}
const deleteProperty = (req,res) =>{
    return 0
}
const findAllProperties = (req,res) =>{
    return 0
}
const findAllByUserProperties = (req,res) =>{
    return 0
}
const findOneProperties = (req,res) =>{
    return 0
}

const formProperty = async (req,res)=>{
    console.log("Creando el formulario para la creación de una nueva propedad")
    console.log(req.body)
    const [ categories, prices ] = await Promise.all([Category.findAll(), Price.findAll()])
    res.render('property/create',{
        page: "New Property",
        showHeader: true,
        data: req.body,
        categories,
        prices
    })
}

const saveProperty=async(req,res)=>{    
    //TODO: Realiza validaciones de los campos antes de intentar guardar
    

    //TODO: Implementar el autorrellenado en el formulario  
    console.log(`Validar y guardar datos en base de datos`)
    const { title, description, nRooms, nParkinlots, priceRange, category, nWc, street, lat, lng} = req.body
    try {
      
        const loggedUser = req.User.id
        if(loggedUser){
            console.log("El usuario existe")
             const savedProperty = await Property.create({
                title,
                description,
                nRooms,
                nParkinlots,
                nWc,
                price_ID: priceRange,
                category_ID:category,
                address: street,
                lat,
                lng,
                user_ID: loggedUser
            })
            console.log(savedProperty);
            console.log(savedProperty.id)
            res.redirect(`/property/create/addImage/${savedProperty.id}`)
        }
    } catch (error) {
        return res.clearCookie("_token").redirect("/login")
    }
    
}

const formAddImage = async(req,res)=>{
    console.log("Estamos en el FormAddimage");
    //Aquí estamos validando que la propiedad exista, que no esté publicada y que sea del usuari, para poder mostrar el formulario 
    const { id } = req.params
    console.log(`Params: ${req.params.id}`)
    const searchedProperty = await Property.findByPk(id) //SELECT * FROM TBB_PROPIEDADES where ID = id
    if(!searchedProperty){
        console.log("La propiedad buscada no existe")
        res.redirect('/login/home')
    }else{
        console.log("La propiedad buscada si existe")
        //TODO: Validar que la propiedad no esté publicada
        if(searchedProperty.published){
            console.log("La propiedad ha sido publicada y las fotos no pueden ser modificadas")
            res.redirect('/login/home')
        }else{
            res.render('property/addImage',{
                page: `Add image to property: ${searchedProperty.title}`,
                propertyID:searchedProperty.id
            })
        }
    }
   
}


const loadImage = async(req, res, next)=>{
    console.log("Vamos a subir ")
    const loggedUser = req.User.id
    const { id} = req.params

    //TODO: Validar que la propiedad exista
    const searchedProperty = await Property.findByPk(id) //SELECT * FROM TBB_PROPIEDADES where ID = id

    if(!searchedProperty){
        console.log("La propiedad buscada no exite")
        res.redirect('/login/home')
    }else{
        console.log("La propiedad buscada si exite")
        //TODO: Validar que la propiedad no esté publicada
        if(searchedProperty.published){
            console.log("La propiedad ha sido publicada y las fotos no pueden ser modificadas")
            res.redirect('/login/home')
        }
    }
    const propertyFk = searchedProperty.user_ID

    if(loggedUser.toString() !== propertyFk.toString()){
        console.log("La propiedad no es del usuario")
        res.redirect('/login/home')
    }
    console.log("La propiedad si es del usuario")
    
    try {
        console.log(req.file)
        //Almacenar la imagen y publicar la propiedad
        searchedProperty.image = req.file.fieldname
        searchedProperty.published = 1
        
        await searchedProperty.save()
       next()
       console.log("Imagen Guardada");

    } catch (error) {
        console.log(`Error: ${error}`);
    }
    
}


export{
    insertProperty,
    updateProperty,
    deleteProperty,
    findAllProperties,
    findAllByUserProperties,
    findOneProperties,
    formProperty,
    saveProperty,
    formAddImage,
    loadImage
}
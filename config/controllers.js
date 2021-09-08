const fs = require("fs")

const name = process.argv[2]
const createController = () => {
    const our_str = `import {Controller, Request, Response, render} from "@apurbadh/cheetah"

export default class ${name} extends Controller{

    get(req : Request, res : Response){
        
    }

    post(req : Request, res : Response){
        
    }

    put(req : Request, res : Response){

    }

    delete(req : Request, res : Response){

    }

    patch(req : Request, res : Response){

    }
    
}

`   
    fs.writeFileSync(__dirname + "/../controllers/" + name + ".ts", our_str)
    console.log("Controller created sucessfully !")
}
createController()
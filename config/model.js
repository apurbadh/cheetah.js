const fs = require("fs")

const name = process.argv[2]
const createModel = () => {
    const our_str = `import { Model, dbTypes, specialTypes } from "cheetah/database";

class ${name} extends Model{

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
    fs.writeFileSync(__dirname + "/../models/" + name + ".ts", our_str)
    console.log("Model created sucessfully !")
}
createModel()
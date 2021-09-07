import { writeFileSync } from "fs"

async function run(){
    const a = await import("./urls");
}

const createController = (name : string) => {
    let str = `import {Controller, Request, Response} from "../cheetah-api"

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
    writeFileSync("controllers/" + name + ".ts", str);
    console.log("Controller Created !")
}

if (process.argv.length == 4){
    let typeofthing = process.argv[2]
    let name = process.argv[3]

    if (typeofthing == "controller"){
        createController(name)
    }
    
}else if (process.argv.length == 2){
    run()
}
import {Controller, Request, Response, render} from "../cheetah-api"

export default class AmirController extends Controller{

    get(req : Request, res : Response){
        let context = {
            "name" : this.queryParameter.name ? this.queryParameter.name : ""
        }
        render(res, "amir.ejs", context)
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

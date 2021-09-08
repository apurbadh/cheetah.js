import {Controller, Request, Response} from "../cheetah-api"
import {user} from "../models/UserModel"
export default class MyController extends Controller{

    get(req : Request, res : Response){
        user.create({
            name : "apurba",
            email : "apurba4790@gmail.com",
            phone: 9841212827
        })
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

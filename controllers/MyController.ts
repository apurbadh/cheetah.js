import {Controller, Request, Response} from "../cheetah-api"
import {user} from "../models/UserModel"
import { dbOperators } from "../cheetah-api/database"

export default class MyController extends Controller{

    async get(req : Request, res : Response){
        user.getAll({name:dbOperators.EQUAL+"apurba"}, (err : any, st : any) => {
            console.log(st)
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

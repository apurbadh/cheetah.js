import { createServer, IncomingMessage, ServerResponse } from "http";
import * as urlU from "url"
import { readFileSync, existsSync } from "fs"
import * as querystring from "querystring"
import * as ejs from "ejs"

export type Request = IncomingMessage
export type Response = ServerResponse

export const sendJSON = (res : Response, jsonFile : Object) => {
    let jstring = JSON.stringify(jsonFile)
    res.write(jstring)
}

export const sendFile = (res : Response, filename : string) => {
    let data = readFileSync(__dirname + "/../" + filename, "utf-8")
    res.write(data)
}
export const render = (res : Response, filename: string, context={} ) => {
    let data = readFileSync(__dirname + "/../templates/" + filename, "utf-8")
    let html = ejs.render(data, context)
    res.write(html)
}

export class Controller{
    //@ts-ignore
    requestData;
    //@ts-ignore
    queryParameter
    //@ts-ignore
    pathParameters : object;
    get(req : Request, res: Response){

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

const urls : string[] = [];
const controllers : typeof Controller[] = []
const urlExtended : string[][] = []
const extendedVarNames : string[][] = []
const firstVar : string[] = []
const exControllers : typeof Controller[] = []

export const url = (dir : string, controllerClass : typeof Controller) => {
    urls.push(dir)
    controllers.push(controllerClass)
}

export const extendedURL = (dir : string, contollerClass : typeof Controller) => {
    let myarr : any = []
    let secarr : any = []
    while (dir.indexOf("{") != -1){
        let myurl = dir.substring(dir.indexOf('{'), dir.indexOf('}') + 1)
        let varname = myurl.substring(1, myurl.length - 1)
        dir = dir.replace(myurl, "")
        myarr.push(varname)
    } 
    extendedVarNames.push(myarr)  
    dir = dir.substring(1, dir.length)
    let oldindex = 0, n = ""
    for (let i = 0; i < myarr.length; i++ ){
        n = dir.substring(oldindex, dir.indexOf('/'))
        if (i == 0){
            firstVar.push(n)
        }
        secarr.push(n)
        oldindex = dir.indexOf('/')
        dir = dir.replace(n+'/', "")
    }
    urlExtended.push(secarr)
    exControllers.push(contollerClass)
}

const checkMethod = (controller : Controller, req : Request, res: Response) =>{
    switch (req.method){
        case "GET":   
            controller.get(req, res);
            break;
        case "POST":
            controller.post(req, res)
            break;
        case "PUT":
            controller.put(req, res)
            break
        case "DELETE":
            controller.delete(req, res)
            break;
        case "PATCH":
            controller.patch(req, res);
            break;
        default:
            break;
        

    }
}

createServer(async (req : Request, res : ServerResponse) => {
    //@ts-ignore
    let pathName : string = urlU.parse(req.url ? req.url : "").pathname;
    const buffers = [];
    let index = urls.indexOf(pathName)
    pathName = pathName.substring(1, pathName.length)
    let neededLater : string = pathName
    pathName = pathName.replace(pathName.substring(pathName.indexOf("/") != -1 ? pathName.indexOf("/") : pathName.length, pathName.length), "")
    let firstvarindex = firstVar.indexOf(pathName);
    if (index != -1){
        let controller = new controllers[index]()
        for await (const chunk of req){
           buffers.push(chunk)
        }
        const data = querystring.parse(buffers.toString())
        controller.requestData = data
        const queryObject = urlU.parse(req.url ? req.url : "",true).query;
        controller.queryParameter = queryObject
        checkMethod(controller, req, res)

    }else if (firstvarindex != -1){
        let obj : Object ={}
        let controller = new exControllers[firstvarindex]()
        neededLater += "/"
        for (let i = 0; i < extendedVarNames[firstvarindex].length; i++){
            let value = neededLater.replace(neededLater.substring(0, neededLater.indexOf("/")) + "/", "")
            if (i != 0){
                value = value.replace(value.substring(0, value.indexOf('/') + 1), "")
            }
            value = value.substring(0, value.indexOf('/'))
            //@ts-ignore
            obj[extendedVarNames[firstvarindex][i]] = value
            for (let j = 0; j < i; j++){
                neededLater = neededLater.replace('/', "")
            }
            neededLater = neededLater.replace(neededLater.substring(0, neededLater.indexOf("/")), "")
        }
        controller.pathParameters = obj
        checkMethod(controller, req, res)
    }else if (existsSync((__dirname + "/../public/" + neededLater))){
        let data = readFileSync(__dirname + "/../public/" + neededLater, "utf-8")
        res.write(data)
    }else{
        res.statusCode = 404
    }

    res.end()
    
}).listen(8080)
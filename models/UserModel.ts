import { Model, dbTypes, specialTypes } from "../cheetah-api/database";

class UserModel extends Model{

    setValues(){
        return {
            "id" : [dbTypes.Integer, specialTypes.primaryKey],
            "name": [dbTypes.String, specialTypes.Unique],
            "email": [dbTypes.String, specialTypes.Unique],
            "phone": [dbTypes.Integer, specialTypes.Unique]
        }
    }
}

export const user = new UserModel("user")
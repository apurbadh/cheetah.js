const fs = require("fs")

const name = process.argv[2]
const nameLowerd = name.toLowerCase()
const createModel = () => {
    const our_str = `import { Model, dbTypes, specialTypes } from "@apurbadh/cheetah/database";

class ${name} extends Model{
  
    setValues(){
        return {

        }
    }
    
}
const ${nameLowerd} = new ${name}("${nameLowerd}")
${nameLowerd}.migrate()
export default ${nameLowerd};

`   
    fs.writeFileSync(__dirname + "/../models/" + name + ".ts", our_str)
    console.log("Model created sucessfully !")
}
createModel()
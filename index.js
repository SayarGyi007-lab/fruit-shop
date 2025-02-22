import express,{json} from "express";

const PORT = 3000;

const app = express();

app.use(json());
let memoryDB = [];
let id = 1;

app.post("/",(req,res)=>{
    const {name,price} = req.body;
    const newMenu = {id : id++, name, price};
    memoryDB.push(newMenu);

    res.status(201).send({message: "new menu is added",newMenu})
})

app.get("/",(req,res)=>{
    res.status(200).send(memoryDB);
})

app.get("/:id",(req,res)=>{
    
    const {id} = req.params;
    const menu = memoryDB.find(m => m.id === parseInt(id))
    if(!menu){
      return res.status(404).send( "menu not found")
    }

    res.status(200).send(menu);
})

app.put("/:id",(req,res)=>{
    const {id} = req.params;
    const menu = memoryDB.find(m=> m.id === parseInt(id));

    if(!menu){
        return res.status(404).send( "menu not found")
    }

    const {name,price} = req.body;
    menu.name = name;
    menu.price = price;

    res.status(200).send({message : `menu id - ${id} is updated`});
    
})

app.delete("/:id",(req,res)=>{
    const {id} = req.params;
    const menu = memoryDB.findIndex (m => m.id === parseInt(id))

    if(!menu){
        return res.status(404).send( "menu not found")
    }

    memoryDB.splice(menu,1)
    res.status(200).send("menu is deleted")

})

app.listen(PORT,()=>{
    console.log("Server is connected");
})
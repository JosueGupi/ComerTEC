const connection = require('./mysql');
const express = require("express")
const app = express()
const AdminAlimentosRouter = require('./routes/AdminAlimentos')
const AdminClientesRouter = require('./routes/AdminClientes')
const ClientRouter = require('./routes/Client')
const AdminPedidosRouter = require('./routes/AdminPedidos')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/adminAlimentos',AdminAlimentosRouter);
app.use('/adminClientes',AdminClientesRouter);
app.use('/client',ClientRouter);
app.use('/adminPedidos',AdminPedidosRouter);

app.listen(process.env.PORT || 3000,()=>{
    console.log('Servers Run')
});


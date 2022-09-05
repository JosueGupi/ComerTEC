const connection = require('./mysql');
const express = require("express")
const app = express()
const AdminAlimentosRouter = require('./routes/AdminAlimentos')
const AdminClientesRouter = require('./routes/AdminClientes')
const ClientRouter = require('./routes/Client')
/*const userRouter =  require('./routes/Users')
const storeRouter = require('./routes/Stores')
const subRouter = require('./routes/Subs')
const shippingRouter = require('./routes/Shipping')
const catalogRouter = require('./routes/Catalog')
const AdminEmployeesRouter = require('./routes/AdminEmployees')
const AdminProductRouter = require('./routes/AdminProducts')
const saleRouter = require('./routes/Sales')
const reviewRouter = require('./routes/Reviews')*/
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use('/adminAlimentos',AdminAlimentosRouter);
app.use('/adminClientes',AdminClientesRouter);
app.use('/client',ClientRouter);
/*
app.use('/users',userRouter);
app.use('/stores',storeRouter);
app.use('/subs',subRouter);
app.use('/shipping',shippingRouter);
app.use('/catalog',catalogRouter);
app.use('/adminEmployees',AdminEmployeesRouter);
app.use('/adminProduct',AdminProductRouter);
app.use('/checkout',saleRouter);
app.use('/review',reviewRouter);*/

app.listen(process.env.PORT || 3000,()=>{
    console.log('Servers Run')
});


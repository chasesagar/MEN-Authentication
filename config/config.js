const CONFIG = {
    env: 'development', // enviroment setting
    port: 5000, // port for running of server side applicatin
    jwtSecret: "Enter your jwt secret here", // jwt secret for etting up JWT token
    mongoUri: 'mongodb+srv://<Cluser dbname>:<password>@cluster0.ihgyv.mongodb.net/<dbname>?retryWrites=true&w=majority' //  location of the MongoDB database instance for the project

}
   
export default CONFIG;
   


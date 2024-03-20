import mongoose from 'mongoose';

export async function connection() {
       try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = await mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB is connected successfully"); 
        })
        connection.on('error', (err) =>{
            console.log("MongoDB is not connected" + err)
        })

    } catch (error) {
        console.log(error);
        
    }
}
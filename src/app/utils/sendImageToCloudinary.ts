
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

export const sendImageToCloudinary = async () => {
    cloudinary.config({ 
        cloud_name: config.cloudName, 
        api_key: config.apiKey, 
        api_secret: config.apiSecret,
    });
    await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', { public_id: 'shoes'} , function (err, result){
        console.log(result)
    })
} 

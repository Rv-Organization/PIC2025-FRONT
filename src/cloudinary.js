// import { Cloudinary } from "@cloudinary/url-gen";
// import { Resize } from "@cloudinary/url-gen/actions";

// const cldInstance = new Cloudinary({ cloud: { cloudName: "eonia" } });

// // Fetch images from the web without uploading them

// // const fetchedImage = cldInstance
// //   .image('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg')
// //   .setDeliveryType('fetch');

// // console.log(fetchedImage.toURL());
// // https://res.cloudinary.com/<cloud_name>/image/fetch/https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg

// // Transform

// export const cluster = () => {
//   const myImage = cldInstance

//     .image("https://res.cloudinary.com/eonia/image/upload/v1679144680/113_vijbiv.jpg")
//     .setDeliveryType("fetch")
//     .resize(Resize.fill().width(100).height(150));

//   return myImage.publicID;
// };

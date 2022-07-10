const sharp = require("sharp");

sharp("./public/images/nenufar.jpg")
    .resize({
        width:1024,
        height:682,
        fit:"",
        
        position:"center",
        background:{r:55,g: 71,b: 79, alpha:0.25 }        
    }
    .extract({ left: 120, top: 70  })
    )
.toFile("./public/images/out_1.jpg")

// sharp("./public/images/verre-eau.jpg")
//     .resize(1000, 1000,{
//         fit:"contain",
//         background:{
//             r:55,
//             g: 71,
//             b: 79
//         }
//     })
// .toFile("./public/images/out_2.jpg")


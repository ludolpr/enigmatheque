const sharp = require("sharp");

sharp("./public/images/nenufar.jpg")
    .resize({
        width:1024,
        height:682,
        fit:"contain",
        position:"center",
        background:{r:55,g: 71,b: 79, alpha:0.25 }        
    }
    )
.toFile("./public/images/out_1.jpg")




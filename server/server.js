const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const mongoose = require("mongoose");
const Document = require("./Document");
const url= process.env.MONGODB_URL;

mongoose.connect(
	
    `${url}`,
	{
        useNewUrlParser: true,
        useUnifiedTopology: true
	}
);
// const username = process.env.DB_USER;
// const password = process.env.DB_PASS;

// console.log(dotenv.parsed)
// const connectionParams = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//   };
//   mongoose.connect(url, connectionParams);

 

const io = require("socket.io")(3001, {
	//io object is for connection
	cors: {
		//cors allows us to connect diff ports
		origin: "http://localhost/3000",
		method: ["GET", "POST"],
	},
});

const defaultValue = ""

io.on("connection", (socket) => {
	socket.on("get-document",async (documentId) => {
		const document = await findorCreateDocumentInDB(documentId);
		socket.join(documentId);
		socket.emit("load-document", document.data);
		socket.on("send-changes", (delta) => {
			socket.broadcast.to(documentId).emit("receive-changes", delta);
		});
        socket.on("save-document", async data=> {
            await Document.findByIdAndUpdate(documentId,{data})
        })
	});
});

async function findorCreateDocumentInDB(id){
    if(id==null) return

    const document= await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: defaultValue})
}

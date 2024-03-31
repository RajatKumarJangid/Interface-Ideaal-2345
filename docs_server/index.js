const { Server } = require('socket.io');
const Connection = require('./config/db');
const { getDocument, updateDocument } = require('./controller/document.controller');

const PORT = process.env.PORT || 9000;

// Connection to database
Connection();

const io = new Server(PORT, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Event listener for incoming connections
io.on('connection', socket => {
    // Event listener to handle get-document request
    socket.on('get-document', async documentId => {
        // Retrieve document from the database
        const document = await getDocument(documentId);
        // Join room with documentId
        socket.join(documentId);
        // Emit load-document event with document data
        socket.emit('load-document', document.data);

        // Event listener to handle send-changes request
        socket.on('send-changes', delta => {
            // Broadcast delta to all clients in the same room except sender
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        // Event listener to handle save-document request
        socket.on('save-document', async data => {
            // Update document data in the database
            await updateDocument(documentId, data);
        });
    });
});

console.log(`Socket.IO server is running on port ${PORT}`);


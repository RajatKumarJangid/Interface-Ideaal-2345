const Document = require('../Schema/document.schema');

const getDocument = async (id) => {
    if (id === null) return;

    // Find the document by its ID
    const document = await Document.findById(id);

    // If the document exists, return it; otherwise, create a new document
    if (document) return document;
    return await Document.create({ _id: id, data: "" });
};

const updateDocument = async (id, data) => {
    return await Document.findByIdAndUpdate(id, { data });
};

// Export the functions
module.exports = {
    getDocument,
    updateDocument
};

const {nanoid} = require('nanoid');

const addNoteHandler = (request, h) => {
    const {title,tags,body} = request.payload;

    const id = nanoid(16);
    createdAt = new Date().toISOString();
    updateAt = createdAt;

    const newNote = {
        title,tags,body,id,createdAt,updateAt
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil ditambahkan',
            data: {
                noteId: id
            },
        });
        response.header('Access-Control-Allow-Origin','*');
        response.code(201);
        return response;
    };
    
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    });
    response.code(500);
    return response;

};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes
    }
});

const getNoteByIdHandler = (request,h) => {
    const {id} = request.params;

    const note = notes.filter(n => n.id === id)[0];

    if(note !== undefined){
        return {
            status: 'success',
            data: {
                note
            }
        }
    };
    
    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan'
    })
    response.code(404);
    return response;
}

const editNoteByIdHandler = (request,h) => {
    const {id} = request.params;

    const {tittle,tags,body} = request.payload;
    const updateAt = new date().toISOString();

    const index = notes.findIndex(note => note.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt
        };
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil diperbarui'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan, Id tidak ditemukan'
    });
    response.code(404);
    return response;
}

const deleteNoteByIdHandler = (request,h) => {
    const {id} = request.params;

    index = notes.findIndex(note => note.id === id);

    if(index !== -1){
        notes.splice(index,1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus, Id tidak ditemukan'
    });
    response.code(404);
    return response;
}

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
};
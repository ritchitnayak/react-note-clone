export async function addNote(folderID, content) {
    const res = await fetch(`/api/folders/${folderID}/notes`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({text: content}),
    });
    return await res.json();
}

export async function updateNote(folderID, noteID, content) {
    const res = await fetch(`/api/folders/${folderID}/notes/${noteID}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({text: content}),
    });
    return await res.json();
}

export async function deleteNote(folderID, noteID) {
    const res = await fetch(`/api/folders/${folderID}/notes/${noteID}`, {
        method: 'DELETE'
    });

    return await res.json();
}
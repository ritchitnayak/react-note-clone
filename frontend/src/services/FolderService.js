export async function getAllFolders() {
    const response = await fetch('/api/folders');
    return await response.json();
}

export async function addFolder(folderName) {
    const res = await fetch('/api/folders', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({fname: folderName}),
    });
    return await res.json();
}

export async function deleteFolder(folderID, noteID) {
    const res = await fetch(`/api/folders/${folderID}`, {
        method: 'DELETE'
    });

    return await res.json();
}
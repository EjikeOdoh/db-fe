const els = document.querySelectorAll('dialog')!

const dialogs = Array.from(els)

function openModal() {
    dialogs.forEach(dialog => {
        dialog.showModal()
    })
}
function closeModal() {
    dialogs.forEach(dialog => {
        dialog.close()
    })
}



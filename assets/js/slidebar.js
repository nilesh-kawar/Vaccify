$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

//Calculate Total Slots
// function totalSlotAvailable() {
//     var slot1Available = document.getElementById("slot1Input").value;
//     slot1Available = parseInt(slot1Available, 10);
//     var slot2Available = document.getElementById("slot2Input").value;
//     slot2Available = parseInt(slot2Available, 10);
//     var total = slot1Available + slot2Available;
//     document.getElementById("totalSlots").value = total;
// }


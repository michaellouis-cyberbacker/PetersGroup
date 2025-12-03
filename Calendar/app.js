// Time slot config
const startHour = 9;
const endHour = 17;
const interval = 30; // minutes

// Simulated availability
const maxGroupSize = 5;
let bookedSlots = {
  // Example: '2025-12-05_10:00': 3
};

document.addEventListener("DOMContentLoaded", () => {
  const datePicker = document.getElementById("datePicker");
  const timeSlotsDiv = document.getElementById("timeSlots");
  const form = document.getElementById("appointmentForm");
  const formDiv = document.getElementById("bookingForm");
  const selectedSlotInput = document.getElementById("selectedSlot");

  // Set today's date as min
  const today = new Date().toISOString().split("T")[0];
  datePicker.setAttribute("min", today);

  datePicker.addEventListener("change", () => {
    const selectedDate = datePicker.value;
    renderTimeSlots(selectedDate);
    formDiv.classList.add("hidden");
  });

  function renderTimeSlots(date) {
    timeSlotsDiv.innerHTML = "";

    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += interval) {
        const time = `${pad(hour)}:${pad(min)}`;
        const key = `${date}_${time}`;
        const bookedCount = bookedSlots[key] || 0;

        if (bookedCount < maxGroupSize) {
          const slotBtn = document.createElement("div");
          slotBtn.className = "time-slot";
          slotBtn.innerText = time;
          slotBtn.dataset.time = time;

          slotBtn.addEventListener("click", () => {
            document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected"));
            slotBtn.classList.add("selected");
            selectedSlotInput.value = `${date} ${time}`;
            formDiv.classList.remove("hidden");
          });

          timeSlotsDiv.appendChild(slotBtn);
        }
      }
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const slot = selectedSlotInput.value;
    bookedSlots[slot.replace(" ", "_")] = (bookedSlots[slot.replace(" ", "_")] || 0) + 1;

    alert("Appointment booked for " + slot);
    form.reset();
    formDiv.classList.add("hidden");
    renderTimeSlots(datePicker.value);
  });

  function pad(n) {
    return n.toString().padStart(2, "0");
  }
});

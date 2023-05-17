const apiKey = "9c7dcb795623bb10dea85fa84b887ca7";
const baseUrl = "https://lager.emilfolino.se/v2";


function toast(message) {
    const toast = document.getElementsByClassName("toast")[0];

    toast.querySelector(".toast-body").innerHTML = message;

    toast.classList.add("visible");

    setTimeout(() => {
        toast.className = toast.className.replace("visible", "");
    }, 3000);
}
export { apiKey, baseUrl, toast };

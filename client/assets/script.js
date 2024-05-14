// Nav icon
document.addEventListener("DOMContentLoaded", function () {
  let menu = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navbar");

  if (menu && navbar) {
    menu.onclick = () => {
      menu.classList.toggle("bx-x");
      navbar.classList.toggle("open");
    };
  } else {
    console.error("Menu icon or navbar not found in the DOM.");
  }
});

// Store the input data in db
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector("button");
  const post = document.querySelector(".post");
  const reviews = document.querySelector(".reviews");

  const commentForm = document.getElementById("commentForm");
  const commentTextarea = document.querySelector(".textarea textarea");
  const nameArea = document.querySelector(".name textarea");

  const starLabels = document.querySelectorAll(".reviews label");

  let selectedStar = 0;

  starLabels.forEach((label) => {
    label.addEventListener("click", () => {
      selectedStar = parseInt(label.getAttribute("for").split("-")[1]);
    });
  });

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const comment = commentTextarea.value;
    const name = nameArea.value;
    console.log("Star Rating:", selectedStar);
    console.log("Comment:", comment);
    console.log("Name:", name);

    const formData = {
      rating: selectedStar,
      comment: comment,
      name: name,
    };

    fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert("Review submitted successfully!");

        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });

    reviews.style.display = "none";
    post.style.display = "block";
  });
});

// Get data from db and display
window.onload = async () => {
  try {
    const response = await fetch("/data");
    const data = await response.json();

    if (response.ok) {
      const swiperWrapper = document.querySelector(".swiper-wrapper");

      data.forEach((item) => {
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");

        const flexDiv = document.createElement("div");
        flexDiv.classList.add("flex");

        const commentsDiv = document.createElement("div");
        commentsDiv.classList.add("comments");
        commentsDiv.textContent = item.comment;

        const profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        const profileImg = document.createElement("img");
        profileImg.src = "assets/img/main_photo.jpg";
        profileImg.alt = "Profile Image";
        profileDiv.appendChild(profileImg);

        const profileHeader = document.createElement("h2");
        profileHeader.textContent = item.name;
        profileDiv.appendChild(profileHeader);

        const profileSpan = document.createElement("span");
        profileSpan.textContent = item.role;
        profileDiv.appendChild(profileSpan);

        flexDiv.appendChild(commentsDiv);
        flexDiv.appendChild(profileDiv);
        swiperSlide.appendChild(flexDiv);
        swiperWrapper.appendChild(swiperSlide);
      });
    } else {
      console.error("Error fetching data:", data);
      alert("Error fetching data. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. Please try again later.");
  }
};

const apiURL = "https://openapi.programming-hero.com/api/videos/category/";

const loadData = (category) => {
    currentCategory = category;
    fetch(apiURL + category)
    .then((res) => res.json())
    .then((data) => {
        if (data.data.length === 0) {
            displayError(data.message);
        } else {
            const sortedVideos = sortByViewsCount(data.data);
            displayData(data.data);
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
        displayError("No videos found");
    });
};

const sortByViewsCount = (videos) => {
    return videos.sort((a, b) => b.others.views - a.others.views);
};

const sortByView = () => {
    loadData(currentCategory);
};

const displayData = (videos) => {
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement("div");
        card.classList.add("box", "col-md-4", "mb-4");
        card.innerHTML = `
        
        <div class="container mt-4">
        <div class="row">
            <!-- Video Thumbnail Column -->
            <div class="col-md-8 w-auto">
                <img src="${video.thumbnail}" alt="Video Thumbnail" class="img-fluid" style="height: 200px">
            </div>

            <!-- Video Details Column -->
            <div class="col-md-8">
                <div class="d-flex p-1" style="margin-top: 20px;">
                    <img src="${video.authors[0].profile_picture}" alt="Profile Picture" class="profile-picture" style="border-radius: 50%; width: 40px; height: 40px; margin-right: 10px;">

                    <!-- Video Title -->
                    <h6>${video.title}</h6>
                </div>
                <p>
                    <span class="mx-2">${video.authors[0].profile_name}</span>
                    ${video.authors[0].verified ? '<img src="./img/verified_7641727.png" alt="Verified Icon" class="img-fluid" style="width: 25px; height: 25px; margin-bottom: 3px;">' : ''}
                </p>
                <p class="mx-2">${video.others.views} views</p>
            </div>
        </div>
    </div>

        `;
        videosContainer.appendChild(card);
    });
};


const displayError = () => {
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";
    const errorCard = document.createElement("div");
    errorCard.classList.add("box", "col-12", "mb-4", "text-center");
    errorCard.innerHTML = `
        <div class="w-auto p-5 m-auto">
            <img src="./img/not found.png" alt="not found">
            <h3 class="p-4">Oops! Sorry, There is no content here.</h3>
        </div>
    `;
    videosContainer.appendChild(errorCard);
};
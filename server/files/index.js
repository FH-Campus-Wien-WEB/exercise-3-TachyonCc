function loadMovies(genre) {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status == 200) {
            const movies = JSON.parse(xhr.responseText);

            for (const movie of movies) {
                const article = document.createElement("article");
                article.id = movie.imdbID;

                const title = document.createElement("h2");
                title.textContent = movie.Title;

                const poster = document.createElement("img");
                poster.src = movie.Poster;
                poster.alt = movie.Title + " poster";

                const released = document.createElement("p");
                released.innerHTML = "<strong>Released:</strong> " + movie.Released;

                const runtime = document.createElement("p");
                runtime.innerHTML = "<strong>Runtime:</strong> " + movie.Runtime + " min";

                const genres = document.createElement("p");
                genres.innerHTML = "<strong>Genres:</strong> ";
                for (const genreName of movie.Genres) {
                    const genreTag = document.createElement("span");
                    genreTag.className = "genre";
                    genreTag.textContent = genreName;
                    genres.appendChild(genreTag);
                }

                const directors = document.createElement("p");
                directors.innerHTML =
                    "<strong>Directors:</strong> " + movie.Directors.join(", ");

                const writers = document.createElement("p");
                writers.innerHTML =
                    "<strong>Writers:</strong> " + movie.Writers.join(", ");

                const actors = document.createElement("p");
                actors.innerHTML =
                    "<strong>Actors:</strong> " + movie.Actors.join(", ");

                const plot = document.createElement("p");
                plot.innerHTML = "<strong>Plot:</strong> " + movie.Plot;

                const metascore = document.createElement("p");
                metascore.innerHTML =
                    "<strong>Metascore:</strong> " + movie.Metascore;

                const imdbRating = document.createElement("p");
                imdbRating.innerHTML =
                    "<strong>IMDb Rating:</strong> " + movie.imdbRating;

                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.onclick = function () {
                    location.href = "edit.html?imdbID=" + movie.imdbID;
                };

                article.appendChild(title);
                article.appendChild(poster);
                article.appendChild(released);
                article.appendChild(runtime);
                article.appendChild(genres);
                article.appendChild(directors);
                article.appendChild(writers);
                article.appendChild(actors);
                article.appendChild(plot);
                article.appendChild(metascore);
                article.appendChild(imdbRating);
                article.appendChild(editButton);

                mainElement.appendChild(article);
            }
        } else {
            mainElement.append(
                "Daten konnten nicht geladen werden, Status " +
                xhr.status +
                " - " +
                xhr.statusText
            );
        }
    };

    let url = "/movies";

    if (genre) {
        const params = new URLSearchParams();
        params.set("genre", genre);
        url += "?" + params.toString();
    }

    xhr.open("GET", url);
    xhr.send();
}

window.onload = function () {
    const navElement = document.querySelector("nav");

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status == 200) {
            const genres = JSON.parse(xhr.responseText);

            const allButton = document.createElement("button");
            allButton.textContent = "All";
            allButton.onclick = function () {
                loadMovies();
            };
            navElement.appendChild(allButton);

            for (const genre of genres) {
                const button = document.createElement("button");
                button.textContent = genre;
                button.onclick = function () {
                    loadMovies(genre);
                };
                navElement.appendChild(button);
            }

            navElement.querySelector("button").click();
        } else {
            navElement.append(
                "Genres konnten nicht geladen werden, Status " +
                xhr.status +
                " - " +
                xhr.statusText
            );
        }
    };

    xhr.open("GET", "/genres");
    xhr.send();
};
(async function loadConfig() {
    try {
        var config = await fetch('./config.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load config.json');
                }
                return response.json();
            });
        console.log('Config loaded:', config);
        setupPage(config);
    } catch (error) {
        console.error('Error loading config.json:', error);
    }
})();

function setupPage(config) {
    document.title = config.title;

    var photo = document.getElementById('photo');
    photo.src = documentLink(config.photo);
    photo.alt = config.title;
    photo.width = "120";
    photo.height = "120";

    var name = document.getElementById('name');
    name.innerHTML = config.name;

    var description = document.getElementById('description');
    description.innerHTML = config.description;

    buildLinks(config.links);

    backgroundLink(config.background);

    author(config.author.name, config.author.url);

}

function documentLink(driveLink) {
    var id = driveLink.split('/')[5];
    var link = "https://lh3.googleusercontent.com/d/" + id;
    return link;
}

function backgroundLink(driveLink) {
    var body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = "url('" + documentLink(driveLink) + "')";
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.height = "100vh";
    body.style.margin = "0";
    body.style.padding = "0";

    var html = document.getElementsByTagName("html")[0];
    html.style.height = "100%";
    html.style.margin = "0";
    html.style.padding = "0";
}

function author(name, url) {
    var author = document.getElementById("author");
    author.href = url;
    author.target = "_blank";
    author.innerHTML = "Copyright " + name;
}

function buildLinks(links) {
    var linksContainer = document.getElementById("links");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var linkElement = document.createElement("a");
        linkElement.href = link.url;
        linkElement.target = "_blank";
        linkElement.className = "link-item";

        var linkContent = document.createElement("div");
        var linkText = document.createElement("p");
        linkText.innerHTML = link.name;

        linkContent.appendChild(linkText);
        linkElement.appendChild(linkContent);

        linksContainer.appendChild(linkElement);
    }
}
const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAMklEQVR4nGKZqHOBgZaAiaamj1owasGoBaMWjFowasGoBaMWjFowasGoBVQEgAAAAP//f/MB0O/6UmIAAAAASUVORK5CYII=";
const nodes = document.querySelectorAll('link[rel*="icon"]');
for (const node of nodes) {
    node.href = img;
}

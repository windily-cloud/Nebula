import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
const graphs = document.getElementsByClassName("mermaid");
if (document.getElementsByClassName("mermaid").length > 0) {
    mermaid.initialize({
        startOnLoad: true,
        fontFamily: "var(--sans-font)",
        // @ts-ignore This works, but TS expects a enum for some reason
        theme: localStorage.getItem("isDark") === "true" ? "dark" : "default",
    });
    for (const graph of graphs) {
        const content = graph.getAttribute("data-content");
        if (!content) continue;
        let svg = document.createElement("svg");
        const id = (svg.id = "mermaid-" + Math.round(Math.random() * 100000));
        graph.appendChild(svg);
        mermaid.render(id, content, (result) => {
            graph.innerHTML = result;
        });
    }
}

import React, { useEffect, useState } from "react";
import "./styles.css";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-newsletter/dist/grapesjs-preset-newsletter.css";
import grapesjs from "grapesjs";

export default function App() {
  const [htmlString, setHtmlString] = useState(null);
  const [cssString, setCssString] = useState("");
  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (editor) {
      editor.Commands.add("alert-world", {
        run: () => {
          alert("I'm world!");
        },
        stop: () => {},
        enable: () => {},
        disable: () => {}
      });

      editor.Panels.addButton("options", {
        id: "alert-world",
        className: "fa fa-globe",
        command: "alert-world",
        attributes: {
          title: "Alert World"
        }
      });
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) {
      const es = grapesjs.init({
        container: "#gjs",
        plugins: ["gjs-preset-newsletter"],
        pluginsOpts: {
          "gjs-preset-newsletter": {
            modalTitleImport: "Import template"
          }
        },
        blockManager: {
          appendTo: "#blocks",
          blocks: [
            {
              id: "section", // id is mandatory
              label: "<b>Section</b>", // You can use HTML/SVG inside labels
              attributes: { class: "gjs-block-section" },
              content: `<section>
                <h1>This is a simple title</h1>
                <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
              </section>`
            },
            {
              id: "text",
              label: "Text",
              content: '<div data-gjs-type="text">fuq your text here</div>'
            },
            {
              id: "image",
              label: "Image",
              // Select the component once it's dropped
              select: true,
              // You can pass components as a JSON instead of a simple HTML string,
              // in this case we also use a defined component type `image`
              content: { type: "image" },
              // This triggers `active` event on dropped components and the `image`
              // reacts by opening the AssetManager
              activate: true
            }
          ]
        }
      });
      setEditor(es);
    }
  }, []);

  return (
    <div>
      <div id="gjs" />
      <div id="blocks" />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./styles.css";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-newsletter/dist/grapesjs-preset-newsletter.css";
import grapesjs from "grapesjs";
import jsPDF from "jspdf";
import {readExcelFile} from "../src/utility/function"
import html2canvas from "html2canvas";
 export default function App() {
  const [htmlString, setHtmlString] = useState(null);
  const [cssString, setCssString] = useState("");
  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [editor, setEditor] = useState(null);
  

  useEffect(() => {
    if (editor) {
      editor.Commands.add("alert-world", {
        run: () => {
         
          
             gen();
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

  function gen(){
    const canvas = editor.Canvas.getElement();
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const opts = {
      scrollX: -window.scrollX,
  scrollY: -window.scrollY,
      scale: 4,
      useCORS: true
    };
    
    html2canvas(canvas, opts).then(function(canvas) {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'pt', [width, height]);
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('document.pdf');
    });
  }
  
  useEffect(() => {
    if (editor) {
      editor.on("component:add", (component) => {
        if (component.attributes.type === "span") {
          readExcelFile();
          console.log("Span component added:", component);
          // Call your function here
        }
      });
  
      editor.on("component:dblclick", (component) => {
        if (component.attributes.type === "span") {
          console.log("Span component double-clicked:", component);
          // Call your function here
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
              id: "span",
              label: "Span",
              content: '<span data-gjs-type="span">Hello world!</span>',
              category: "Basic",
              attributes: { class: "fa fa-text-width" }
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

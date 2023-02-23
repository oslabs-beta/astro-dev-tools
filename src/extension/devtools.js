// Listen for panel creation event
chrome.devtools.panels.create(
  'Astro Panel',
  '/download.png',
  'panel.html',
  (
    panel //Executes this callback once panel is created.
  ) =>
    panel.onShown.addListener((window) => {
      // Retrieve's the target page's HTML
      async function getTargetPageHTML() {
        console.log('Attempting to retrieve dom tree from target html');
        // Use chrome.devtools.inspectedWindow.eval() to retrieve the page's HTML
        const html = await new Promise((resolve, reject) => {
          chrome.devtools.inspectedWindow.eval(
            'document.documentElement.outerHTML',
            //error handling
            (result, exception) => {
              if (exception) {
                reject(exception);
              } else {
                resolve(result);
              }
            }
          );
        });

        return html;
      }

      // Call the getTargetPageHTML() function and render the HTML in the dev tools panel
      (async () => {
        try {
          const html = await getTargetPageHTML();
          const domTreeContainer = window.document.getElementById('dom-tree');
          console.log('html:', html);
          // const parser = new DOMParser();
          // const doc = parser.parseFromString(html, 'text/html');
          // const elements = doc.querySelectorAll('*');
          // const filteredHtml = Array.from(elements)
          //   .filter((el) => el.nodeType === Node.ELEMENT_NODE)
          //   .map((el) => el.outerHTML)
          //   .join('\n');
          //   const prettierHtml = await window.prettier.format(filteredHtml, {
          //     parser: 'html',
          //     printWidth: 80,
          //     tabWidth: 2,
          //     useTabs: false,
          //   });
          const codeElement = window.document.createElement('code');
          codeElement.textContent = html;
          codeElement.style.whiteSpace = 'pre-wrap';
          domTreeContainer.appendChild(codeElement);
        } catch (error) {
          console.error(error);
        }
      })();
    })
);

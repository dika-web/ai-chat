import {MarkedOptions, MarkedRenderer} from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  renderer.code = ({lang, text}) => {
    return `<div class="smart-code__title">${lang}</div><pre><code class="language-${lang}">${text}</code></pre>`;
  };

  return {
    renderer,
    gfm: true,
    breaks: false
  };
}

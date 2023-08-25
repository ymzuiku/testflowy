import { createSignal } from "https://cdn.skypack.dev/solid-js";
import html from "https://cdn.skypack.dev/solid-js/html";
import { render } from "https://cdn.skypack.dev/solid-js/web";

async function fileLoadOne(e, index = 0) {
  try {
    const file = e.files[index];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    const out = new Promise((res) => {
      fileReader.addEventListener("load", function () {
        res(fileReader.result);
      });
    });
    return out;
  } catch (err) {
    console.error(err);
    return "";
  }
}

async function filesLoad(e) {
  const list = e.files || [];
  let n = 0;
  const out = [];
  // eslint-disable-next-line
  for (const v of list) {
    const file = await fileLoadOne(e, n);
    out.push({ file, name: v.name, value: v.name });
    console.log(out[out.length - 1]);
    n++;
  }
  return out;
}

const App = () => {
  const [img, setImg] = createSignal("");
  const handleFile = async (e) => {
    const file = await fileLoadOne(e.currentTarget);
    setImg(file);
  };

  // Customize the file upload UI (see "customization" below):
  const options = { multi: true };

  return html`<div class="container-md px-20 py-5">
    <h1 class="">Example Glove file</h1>
    <form class="was-validated">
      <div class="mb-3">
        <label for="validationTextarea" class="form-label">Textarea</label>
        <textarea
          class="form-control"
          id="validationTextarea"
          placeholder="Required example textarea"
          required
        ></textarea>
        <div class="invalid-feedback">Please enter a message in the textarea.</div>
      </div>

      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" id="validationFormCheck1" required />
        <label class="form-check-label" for="validationFormCheck1">Check this checkbox</label>
        <div class="invalid-feedback">Example invalid feedback text</div>
      </div>

      <div class="form-check">
        <input type="radio" class="form-check-input" id="validationFormCheck2" name="radio-stacked" required />
        <label class="form-check-label" for="validationFormCheck2">Toggle this radio</label>
      </div>
      <div class="form-check mb-3">
        <input type="radio" class="form-check-input" id="validationFormCheck3" name="radio-stacked" required />
        <label class="form-check-label" for="validationFormCheck3">Or toggle this other radio</label>
        <div class="invalid-feedback">More example invalid feedback text</div>
      </div>

      <div class="mb-3">
        <select class="form-select" required aria-label="select example">
          <option value="">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <div class="invalid-feedback">Example invalid select feedback</div>
      </div>

      <div class="mb-3">
        <div class="col">
          <input type="file" class="form-control" aria-label="file example" required onchange=${handleFile} />
          <Show when=${img}>
            <img src=${img} style="height:50px" />
          </Show>
        </div>
        <div class="invalid-feedback">Example invalid form file feedback</div>
      </div>
    </form>
    <label for="customRange1" class="form-label">Example range</label>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
      <label class="form-check-label" for="flexCheckDefault"> Default checkbox </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
      <label class="form-check-label" for="flexCheckChecked"> Checked checkbox </label>
    </div>
    <input type="range" class="form-range" id="customRange1" />
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
      <label class="form-check-label" for="flexCheckIndeterminate"> Indeterminate checkbox </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
      <label class="form-check-label" for="flexRadioDefault1"> Default radio </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
      <label class="form-check-label" for="flexRadioDefault2"> Default checked radio </label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
      <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
    </div>
    <p>
      <a
        class="btn btn-primary"
        data-bs-toggle="collapse"
        href="#collapseExample"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Link with href
      </a>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Button with data-bs-target
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user
        activates the relevant trigger.
      </div>
    </div>

    <label for="exampleColorInput" class="form-label">Color picker</label>
    <input
      type="color"
      class="form-control form-control-color"
      id="exampleColorInput"
      value="#563d7c"
      title="Choose your color"
    />
  </div>`;
};

render(App, document.body);

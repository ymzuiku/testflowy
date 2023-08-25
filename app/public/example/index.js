import { createSignal, onCleanup } from "https://cdn.skypack.dev/solid-js";
import html from "https://cdn.skypack.dev/solid-js/html";
import { render } from "https://cdn.skypack.dev/solid-js/web";

const App = () => {
  const [count, setCount] = createSignal(0);
  const timer = setInterval(() => setCount(count() + 1), 1000);
  onCleanup(() => clearInterval(timer));
  const handleGotoFile = () => {
    location.href = "/example/file.html";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return html`<div class="container-md px-20 py-4">
    <h1>Click tools play:</h1>
    <!-- login -->
    <h2 class="pt-3">Example Form</h2>
    <form class="mb-3" onsubmit=${handleSubmit}>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describeby="emailHelp" />
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" aria-describeby="passwordHelp" />
      </div>
      <div class="mb-3">
        <label for="selectId" class="form-label">Select example</label>
        <select id="selectId" class="mb-3 form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <!-- button trigger modal -->
    <h2 class="pt-3">Example modal</h2>
    <div class="row g-3 needs-validation">
      <button
        type="button"
        id="open"
        class="col-4 me-3 btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Lanch demo modal
      </button>
      <button
        type="button"
        id="open2"
        class="col-4 me-3 btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Lanch demo modal2
      </button>
    </div>

    <!-- modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aira-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aira-label="Close"></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button
              type="button"
              id="save"
              class="btn btn-primary"
              data-bs-toggle="modal"
              aira-label="Close"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" aira-labelledby="exampleModalLabel2" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel2">Modal title middle</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aira-label="Close"></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" id="close1" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button
              type="button"
              id="save"
              class="btn btn-primary"
              data-bs-toggle="modal"
              aira-label="Close"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- vaild -->
    <h2 class="pt-3">Example vaild</h2>
    <form class="row g-3 needs-validation" novalidate>
      <div class="col-md-4">
        <label for="validationCustom01" class="form-label">First name</label>
        <input type="text" class="form-control" id="validationCustom01" value="Mark" required />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-4">
        <label for="validationCustom02" class="form-label">Last name</label>
        <input type="text" class="form-control" id="validationCustom02" value="Otto" required />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-4">
        <label for="validationCustomUsername" class="form-label">Username</label>
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">@</span>
          <input
            type="text"
            class="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            required
          />
          <div class="invalid-feedback">Please choose a username.</div>
        </div>
      </div>
      <div class="col-md-6">
        <label for="validationCustom03" class="form-label">City</label>
        <input type="text" class="form-control" id="validationCustom03" required />
        <div class="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom04" class="form-label">State</label>
        <select class="form-select" id="validationCustom04" required>
          <option selected disabled value="">Choose...</option>
          <option>...</option>
        </select>
        <div class="invalid-feedback">Please select a valid state.</div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom05" class="form-label">Zip</label>
        <input type="text" class="form-control" id="validationCustom05" required />
        <div class="invalid-feedback">Please provide a valid zip.</div>
      </div>
      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
          <label class="form-check-label" for="invalidCheck"> Agree to terms and conditions </label>
          <div class="invalid-feedback">You must agree before submitting.</div>
        </div>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" type="button" onclick=${handleGotoFile}>Submit form ${count}</button>
      </div>
    </form>
  </div>`;
};

render(App, document.body);

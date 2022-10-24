import React from "react";
import thunk from "redux-thunk";
// import isReact from "is-react";
import Home from "../components/Home/Home.jsx";
// import axios from "axios";
import nock from "nock";
import nodeFetch from "node-fetch";
axios.defaults.adapter = require("axios/lib/adapters/http");

configure({ adapter: new Adapter() });

describe("<Home />", () => {
  let home, store, state, getAllRecipes, componentDidMountSpy;
  global.fetch = nodeFetch;
  const mockStore = configureStore([thunk]);
  beforeEach(() => {
    // Se Mockea las request a las api
    const apiMock = nock("http://localhost:3001").persist();

    // "/products" => Retorna la propiedad products del archivo data.json
    apiMock.get("/recipes").reply(200, data.products);

    // "/products/:id" => Retorna un producto matcheado por su id
    apiMock.get(/\/recipes\/\d/).reply(200, (uri, requestBody) => {
      const idStr = uri.split("/").pop();
      const id = Number(idStr);
      return data.products.find((product) => product.id === id);
    });
    state = {
      products: [],
      productDetails: {},
    };
    store = mockStore(state);
    home = mount(<Home />);
    // Si o si vas a tener que usar class component! No van a pasar ninguno de los tests si no lo haces.
    expect(isReact.classComponent(Home)).toBeTruthy();

    store.clearActions();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("Debería renderizar un contenedor principal", () => {
    const { container } = render(<div variant="mainContainer" />);
    expect(container.getElementsByClassName("mainContainer").length).toBe(1);
  });

  it("Debería contener un componente nav", () => {
    expect(home.find("nav")).toHaveLength(1);
  });
  it("Debería renderizar un div contenedor", () => {
    expect(home.find("div")).toHaveLength(1);
  });
});

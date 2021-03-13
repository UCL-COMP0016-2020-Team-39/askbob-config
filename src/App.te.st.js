import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

beforeEach(() => {
  global.URL = { createObjectURL: object => `blob:${object}` };
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

it("renders correctly", () => {
  const title = screen.getByText(/AskBob/);

  expect(title).toBeInTheDocument();
});

it("enters plugin name", () => {
  const pluginInput = screen.getByTestId("pluginInput");
  fireEvent.change(pluginInput, { target: { event: "weather" } });
  const dataJson = screen.getByTestId("dataJson");
  expect(dataJson.innerText).toBe("{pluginName: weather }");
});
